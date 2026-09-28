import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const systemChrome = process.env.CHROME_PATH || "/usr/bin/google-chrome";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 1440, height: 1000 },
    launchOptions: existsSync(systemChrome)
      ? { executablePath: systemChrome, args: ["--no-sandbox"] }
      : {},
  },
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
