import { createApp } from "./app.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const app = createApp(config);

app.listen(config.port, () => {
  const mode = config.demoMode ? "DEMO" : "LIVE";
  console.log(
    `[origin] API listening on http://localhost:${config.port} ` +
      `(mode=${mode}, etoroEnv=${config.etoroEnv})`,
  );
});
