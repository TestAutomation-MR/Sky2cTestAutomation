export class TestConfig {
  // Application URLs
  public readonly appUrl: string = process.env.BASE_URL || 'https://quote.sky2c.com/login';
  public readonly loginUrl: string = this.appUrl;
  public readonly dashboardUrl: string = `${this.appUrl}/dashboard`;
  public readonly airUrl: string = 'https://quote.sky2c.com/air';
  public readonly truckUrl: string = 'https://quote.sky2c.com/';


  // Test Data
  public readonly testData = {
    validUser: {
      email: process.env.TEST_USER_EMAIL || 'test@example.com',
      password: process.env.TEST_USER_PASSWORD || 'password123'
    },
    invalidUser: {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }
  };

  // Timeouts
  public readonly timeouts = {
    short: 5000,
    medium: 10000,
    long: 30000,
    veryLong: 60000
  };

  // Browser configurations
  public readonly browserConfig = {
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  // API configurations
  public readonly apiConfig = {
    baseUrl: process.env.API_BASE_URL || 'https://api.quote.sky2c.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  // Screenshot and video settings
  public readonly mediaConfig = {
    screenshotOnFailure: true,
    videoOnFailure: true,
    traceOnFailure: true
  };
}