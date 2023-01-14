// playwright.config.ts
import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,

  // Each test is given 60 seconds in pipelines, 30 locally
  timeout: process.env.CI ? 60000 : 30000,

  // Two retries for each test
  retries: process.env.CI ? 3 : 0,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 1 : undefined,

  // Configure browser and context here
  use: {
    baseURL: process.env.CI_ENVIRONMENT_URL || "http://localhost:5173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    /*{
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
        video: "off",
      },
    },*/
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: false, video: "off" },
    },
  ],
  outputDir: "reports/e2e/output",
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/e2e/html" }],
    ["json", { outputFile: "reports/e2e/results.json" }],
    [
      "junit",
      {
        embedAnnotationsAsProperties: true,
        outputFile: "results.xml",
      },
    ],
  ],
  expect: {
    toMatchSnapshot: {
      threshold: 0.5,
    },
  },
  testDir: "e2e",
  /* Run your local dev server before starting the tests */
  webServer: {
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
     Playwright will re-use the local server if there is already a dev-server running.
     */
    command: process.env.CI ? "vite preview --port 5173" : "vite dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
};
export default config;
