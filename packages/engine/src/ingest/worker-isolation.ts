export function isolateWorkerNetwork(workerScope: {
  fetch?: unknown;
  XMLHttpRequest?: unknown;
  WebSocket?: unknown;
}): void {
  const deny = () => {
    throw new Error('MarginShield analysis worker cannot use the network after initialisation.');
  };
  workerScope.fetch = deny;
  workerScope.XMLHttpRequest = undefined;
  workerScope.WebSocket = undefined;
}
