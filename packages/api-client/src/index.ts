export interface LicenceResponse {
  token: string;
  plan: string;
  entitlements: string[];
  methodVersion: string;
  configVersion: string;
  expiresAt: string;
}

export async function fetchLicence(baseUrl: string): Promise<LicenceResponse> {
  const response = await fetch(`${baseUrl}/api/licence`);
  if (!response.ok) {
    throw new Error(`Licence fetch failed: ${response.status}`);
  }
  return response.json() as Promise<LicenceResponse>;
}
