# Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright and TypeScript, featuring Page Object Model (POM) design pattern, Allure reporting, and robust test utilities.

## 🚀 Features

- **Page Object Model (POM)** - Organized and maintainable test structure
- **Allure Reporting** - Beautiful and detailed test reports
- **Multi-browser Support** - Chrome, Firefox, Safari, and Mobile browsers
- **Parallel Execution** - Run tests in parallel for faster execution
- **Screenshot & Video Capture** - Automatic capture on test failures
- **Test Data Management** - Centralized configuration and test data
- **Utility Functions** - Common helper methods for test automation
- **Environment Support** - Different configurations for different environments

## 📁 Framework Structure

```
├── tests/                          # Test files
│   ├── login.spec.ts              # Login functionality tests
│   └── ...
├── pages/                          # Page Object classes
│   ├── BasePage.ts                # Base page with common methods
│   ├── LoginPage.ts               # Login page object
│   └── ...
├── utils/                          # Utility classes
│   └── TestUtils.ts               # Common test utilities
├── test_data/                      # Test data files
├── screenshots/                    # Screenshot captures
├── test-results/                   # Test execution results
├── allure-results/                 # Allure report data
├── playwright-report/              # HTML test reports
├── global-setup.ts                 # Global test setup
├── global-teardown.ts              # Global test cleanup
├── test.config.ts                  # Test configuration
├── playwright.config.ts            # Playwright configuration
└── package.json                    # Dependencies and scripts
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sky2ctestautomation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Commands

```bash
# Run tests in Chrome only
npm run test:chrome

# Run tests in Firefox only
npm run test:firefox

# Run tests in Safari only
npm run test:safari

# Run tests on mobile Chrome
npm run test:mobile
```

### Parallel Execution

```bash
# Run tests in parallel (3 workers)
npm run test:parallel
```

### Test Filtering

```bash
# Run tests with specific tags
npx playwright test --grep "@sanity"
npx playwright test --grep "@regression"
npx playwright test --grep "@master"
```

## 📊 Reports

### HTML Report
```bash
# Generate and open HTML report
npm run report
```

### Allure Report
```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Serve Allure report
npm run allure:serve
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://quote.sky2c.com
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
API_BASE_URL=https://api.quote.sky2c.com
```

### Test Configuration

Modify `test.config.ts` to update:
- Application URLs
- Test data
- Timeouts
- Browser configurations

## 📝 Writing Tests

### Page Object Model

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.locator('#login-btn');

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Test Structure

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('should login with valid credentials @sanity', async ({ page }) => {
    await loginPage.login('user@example.com', 'password123');
    await expect(page.url()).toContain('dashboard');
  });
});
```

## 🏷️ Test Tags

Use tags to categorize and filter tests:

- `@sanity` - Critical functionality tests
- `@regression` - Comprehensive test suite
- `@master` - Master test suite
- `@smoke` - Quick smoke tests

## 🔍 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Code Generation
```bash
npm run codegen
```

### Trace Viewer
```bash
npm run trace:viewer
```

## 📱 Mobile Testing

The framework supports mobile browser testing:

```bash
# Run tests on mobile Chrome
npm run test:mobile
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Best Practices

1. **Use Page Object Model** - Keep tests maintainable
2. **Add meaningful test descriptions** - Clear test purpose
3. **Use test tags** - Organize and filter tests
4. **Handle async operations properly** - Use await consistently
5. **Add assertions** - Verify expected behavior
6. **Take screenshots on failures** - Help with debugging
7. **Use test data management** - Centralize test data
8. **Write reusable utilities** - Avoid code duplication

## 🐛 Troubleshooting

### Common Issues

1. **Browser not found**
   ```bash
   npm run install:browsers
   ```

2. **Allure report not generating**
   ```bash
   npm install -D allure-commandline
   ```

3. **Tests timing out**
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity
   - Verify application is accessible

## 📞 Support

For questions or issues, please refer to:
- [Playwright Documentation](https://playwright.dev/)
- [Allure Documentation](https://docs.qameta.io/allure/)

## 📄 License

This project is licensed under the ISC License. 