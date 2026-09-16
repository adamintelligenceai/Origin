use serde::Serialize;
use std::fs;
use std::io::{Read, Write};
use std::net::TcpListener;
use std::path::{Path, PathBuf};
use std::time::Duration;
use tauri::{AppHandle, Manager};

#[derive(Serialize)]
struct OAuthCallback {
    code: String,
    state: String,
}

fn sanitize_name(name: &str) -> Result<String, String> {
    if name.is_empty()
        || name.contains("..")
        || !name
            .chars()
            .all(|c| c.is_ascii_alphanumeric() || c == '.' || c == '-' || c == '_')
    {
        return Err("invalid vault name".into());
    }
    Ok(name.to_string())
}

fn app_dir(app: &AppHandle) -> Result<PathBuf, String> {
    app.path().app_data_dir().map_err(|err| err.to_string())
}

fn vault_file(app: &AppHandle, name: &str) -> Result<PathBuf, String> {
    let dir = app_dir(app)?.join("vault");
    fs::create_dir_all(&dir).map_err(|err| err.to_string())?;
    tighten_dir(&dir);
    Ok(dir.join(sanitize_name(name)?))
}

fn snapshot_file(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app_dir(app)?.join("store");
    fs::create_dir_all(&dir).map_err(|err| err.to_string())?;
    tighten_dir(&dir);
    Ok(dir.join("snapshot.json"))
}

fn tighten_dir(path: &Path) {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = fs::set_permissions(path, fs::Permissions::from_mode(0o700));
    }
}

fn tighten_file(path: &Path) {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = fs::set_permissions(path, fs::Permissions::from_mode(0o600));
    }
}

#[tauri::command]
fn health() -> &'static str {
    "ok"
}

#[tauri::command]
fn vault_get(app: AppHandle, name: String) -> Result<Option<String>, String> {
    let path = vault_file(&app, &name)?;
    if !path.exists() {
        return Ok(None);
    }
    fs::read_to_string(path).map(Some).map_err(|err| err.to_string())
}

#[tauri::command]
fn vault_set(app: AppHandle, name: String, value: String) -> Result<(), String> {
    let path = vault_file(&app, &name)?;
    fs::write(&path, value).map_err(|err| err.to_string())?;
    tighten_file(&path);
    Ok(())
}

#[tauri::command]
fn vault_delete(app: AppHandle, name: String) -> Result<(), String> {
    let path = vault_file(&app, &name)?;
    if path.exists() {
        fs::remove_file(path).map_err(|err| err.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn snapshot_load(app: AppHandle) -> Result<Option<String>, String> {
    let path = snapshot_file(&app)?;
    if !path.exists() {
        return Ok(None);
    }
    fs::read_to_string(path).map(Some).map_err(|err| err.to_string())
}

#[tauri::command]
fn snapshot_save(app: AppHandle, snapshot: String) -> Result<(), String> {
    let path = snapshot_file(&app)?;
    fs::write(&path, snapshot).map_err(|err| err.to_string())?;
    tighten_file(&path);
    Ok(())
}

#[tauri::command]
fn snapshot_clear(app: AppHandle) -> Result<(), String> {
    let path = snapshot_file(&app)?;
    if path.exists() {
        fs::remove_file(path).map_err(|err| err.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn oauth_loopback(expected_state: String, port: u16) -> Result<OAuthCallback, String> {
    let listener =
        TcpListener::bind(("127.0.0.1", port)).map_err(|err| err.to_string())?;
    listener
        .set_nonblocking(false)
        .map_err(|err| err.to_string())?;
    let (mut stream, _) = listener.accept().map_err(|err| err.to_string())?;
    let _ = stream.set_read_timeout(Some(Duration::from_secs(120)));
    let mut buf = [0_u8; 4096];
    let read = stream.read(&mut buf).map_err(|err| err.to_string())?;
    let request = String::from_utf8_lossy(&buf[..read]);
    let callback = parse_callback(&request, &expected_state)?;
    let body = b"Project Chief connected. You can close this window. The token stayed on this device.";
    let response = format!(
        "HTTP/1.1 200 OK\r\ncontent-type: text/plain; charset=utf-8\r\ncontent-length: {}\r\nconnection: close\r\n\r\n",
        body.len()
    );
    let _ = stream.write_all(response.as_bytes());
    let _ = stream.write_all(body);
    Ok(callback)
}

fn parse_callback(request: &str, expected_state: &str) -> Result<OAuthCallback, String> {
    let line = request.lines().next().unwrap_or("");
    let path = line.split_whitespace().nth(1).unwrap_or("");
    let query = path.split_once('?').map(|(_, query)| query).unwrap_or("");
    let mut code = None;
    let mut state = None;
    for pair in query.split('&') {
        let (key, value) = pair.split_once('=').unwrap_or(("", ""));
        match key {
            "code" => code = Some(url_decode(value)),
            "state" => state = Some(url_decode(value)),
            _ => {}
        }
    }
    let state = state.ok_or_else(|| "OAuth callback missing state".to_string())?;
    if state != expected_state {
        return Err("OAuth state did not match the local challenge".into());
    }
    let code = code.ok_or_else(|| "OAuth callback missing code".to_string())?;
    Ok(OAuthCallback { code, state })
}

fn url_decode(value: &str) -> String {
    let mut out = String::new();
    let bytes = value.as_bytes();
    let mut index = 0;
    while index < bytes.len() {
        match bytes[index] {
            b'+' => {
                out.push(' ');
                index += 1;
            }
            b'%' if index + 2 < bytes.len() => {
                let hex = &value[index + 1..index + 3];
                if let Ok(byte) = u8::from_str_radix(hex, 16) {
                    out.push(char::from(byte));
                    index += 3;
                } else {
                    out.push('%');
                    index += 1;
                }
            }
            byte => {
                out.push(char::from(byte));
                index += 1;
            }
        }
    }
    out
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            health,
            vault_get,
            vault_set,
            vault_delete,
            snapshot_load,
            snapshot_save,
            snapshot_clear,
            oauth_loopback
        ])
        .run(tauri::generate_context!())
        .expect("error while running application");
}
