const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test/e2e',
  timeout: 60000,
  fullyParallel: false,
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:1234',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start -- --host 127.0.0.1 --port 1234',
    url: 'http://127.0.0.1:1234',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
