import { isolateWorkerNetwork, runIngestedScan } from '@marginshield/engine';

const scope = self as unknown as {
  fetch?: unknown;
  XMLHttpRequest?: unknown;
  WebSocket?: unknown;
  postMessage: (data: unknown) => void;
};
isolateWorkerNetwork(scope);

self.onmessage = (event: MessageEvent) => {
  try {
    const output = runIngestedScan(event.data);
    scope.postMessage({ ok: true, output });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Scan failed';
    scope.postMessage({ ok: false, error: message });
  }
};
