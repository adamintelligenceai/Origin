import { ChiefRuntime } from "@project-chief/runtime";

let instance: ChiefRuntime | undefined;

export function getRuntime(): ChiefRuntime {
  instance ??= new ChiefRuntime();
  return instance;
}

export function resetRuntime(): ChiefRuntime {
  instance = new ChiefRuntime();
  return instance;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
