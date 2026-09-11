/** Typed client for licence / billing metadata — never raw rows. */
export type LicencePlan = 'scan' | 'founding_scan' | 'monitor';

export type LicencePayload = {
  plan: LicencePlan;
  entitlements: string[];
  methodVersion: string;
  configVersion: string;
};

export async function fetchLicence(baseUrl: string): Promise<LicencePayload> {
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/licence`);
  if (!res.ok) throw new Error(`Licence request failed: ${res.status}`);
  return (await res.json()) as LicencePayload;
}
