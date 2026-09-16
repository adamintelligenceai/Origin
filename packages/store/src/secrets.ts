export interface SecretStore {
  get(name: string): Promise<string | undefined>;
  set(name: string, value: string): Promise<void>;
  delete(name: string): Promise<void>;
}

export class MemorySecretStore implements SecretStore {
  private readonly values = new Map<string, string>();

  get(name: string): Promise<string | undefined> {
    return Promise.resolve(this.values.get(name));
  }

  set(name: string, value: string): Promise<void> {
    this.values.set(name, value);
    return Promise.resolve();
  }

  delete(name: string): Promise<void> {
    this.values.delete(name);
    return Promise.resolve();
  }
}

export const DATABASE_KEY_NAME = "project-chief.db-key";
export const ONBOARDING_KEY_NAME = "privacy.onboarding.accepted";
export const INITIALIZED_KEY_NAME = "project-chief.initialized";

export class BridgeSecretStore implements SecretStore {
  constructor(private readonly bridge: SecretStore) {}

  get(name: string): Promise<string | undefined> {
    return this.bridge.get(name);
  }

  set(name: string, value: string): Promise<void> {
    return this.bridge.set(name, value);
  }

  delete(name: string): Promise<void> {
    return this.bridge.delete(name);
  }
}
