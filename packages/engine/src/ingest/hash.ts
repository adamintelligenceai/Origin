/** Content fingerprint for source provenance. */

export async function sha256Hex(bytes: ArrayBuffer | Uint8Array): Promise<string> {
  const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    let h = 0xcbf29ce484222325n;
    for (let i = 0; i < data.length; i += 1) {
      h ^= BigInt(data[i]!);
      h = (h * 0x100000001b3n) & 0xffffffffffffffffn;
    }
    return `fnv1a64_${h.toString(16).padStart(16, '0')}`;
  }
  // Copy into a fresh ArrayBuffer so TypeScript accepts BufferSource under DOM libs.
  const copy = new Uint8Array(data.byteLength);
  copy.set(data);
  const digest = await subtle.digest('SHA-256', copy);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
