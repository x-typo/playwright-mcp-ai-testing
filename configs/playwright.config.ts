import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, "../.env");

if (!process.env.DOTENV_CONFIG_QUIET) {
  process.env.DOTENV_CONFIG_QUIET = "true";
}

dotenv.config({ path: rootEnvPath });

const MainAccountFile = path.resolve(
  __dirname,
  "../auth/storageStates/mainAccountSetup.json"
);

const config: PlaywrightTestConfig = defineConfig({
  globalSetup: path.resolve(__dirname, "../auth/authSetups/global-setup.ts"),

  testDir: "../tests/playwright/features",

  snapshotPathTemplate:
    "../visual-snapshots/{testFileDir}/{arg}{projectName}{ext}",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,

  reporter: process.env.CI
    ? [
        ["list"],
        [
          "junit",
          {
            outputFile: "../desktop-junit-reports/junit.xml",
            embedAnnotationsAsProperties: true,
          },
        ],
        ["html"],
      ]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: process.env.UI_BASE_URL,
    headless: true,
    trace: "retain-on-failure",
    storageState: MainAccountFile,
  },

  timeout: 60_000,
  expect: { timeout: 15_000 },

  projects: [
    {
      name: "chromeUI",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "iosUI",
      use: {
        ...devices["iPhone 14 Pro Max"],
      },
    },
  ],
});

export default config;
