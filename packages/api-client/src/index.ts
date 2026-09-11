export interface LicenceResponse {
  plan: string;
  entitlements: string[];
  methodVersion: string;
  configVersion: string;
}

export async function fetchLicence(_baseUrl: string): Promise<LicenceResponse> {
  return {
    plan: "demo",
    entitlements: ["scan", "reports"],
    methodVersion: "0.1.0",
    configVersion: "0.1.0",
  };
}
