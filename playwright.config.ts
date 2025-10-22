import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000, // 30 seconds
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? '50%' : 1,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        framework: 'playwright',
        language: 'typescript'
      }
    }],
    ['dot'],
    ['list']
  ],

  // Global test configuration
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    actionTimeout: 10000,
    navigationTimeout: 30000,
    baseURL: process.env.BASE_URL || 'https://quote.sky2c.com/login'
  },

  // Test filtering
  grep: process.env.TEST_TAGS ? new RegExp(process.env.TEST_TAGS) : undefined,

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Output directories
  outputDir: 'test-results/',
  
  // Global setup and teardown
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),
});
