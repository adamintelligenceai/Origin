/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OAUTH_MODE?: string;
  readonly VITE_OAUTH_REDIRECT_URI?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_LINKEDIN_CLIENT_ID?: string;
  readonly VITE_META_CLIENT_ID?: string;
  readonly VITE_X_CLIENT_ID?: string;
  readonly VITE_GOOGLE_DESKTOP_REDIRECT_URI?: string;
  readonly VITE_CONTROL_PLANE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
