import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:5175",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "python -m uvicorn api.main:app --host 127.0.0.1 --port 8765",
      cwd: "..",
      url: "http://127.0.0.1:8765/api/v1/demandas",
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: "npm run dev",
      url: "http://127.0.0.1:5175",
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        VITE_DEV_PORT: "5175",
        VITE_DEV_API_PROXY: "http://127.0.0.1:8765",
      },
    },
  ],
});
