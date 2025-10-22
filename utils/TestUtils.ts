import { Page, expect } from '@playwright/test';

export class TestUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Random data generators
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }

  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Wait utilities
  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Screenshot utilities
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `screenshots/${name}_${timestamp}.png`,
      fullPage: true 
    });
  }

  async takeElementScreenshot(locator: any, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await locator.screenshot({ 
      path: `screenshots/${name}_${timestamp}.png` 
    });
  }

  // Assertion utilities
  async expectUrlToContain(expectedUrl: string) {
    await expect(this.page.url()).toContain(expectedUrl);
  }

  async expectPageTitleToContain(expectedTitle: string) {
    await expect(this.page.title()).toContain(expectedTitle);
  }

  async expectElementToBeVisible(locator: any) {
    await expect(locator).toBeVisible();
  }

  async expectElementToContainText(locator: any, expectedText: string) {
    await expect(locator).toContainText(expectedText);
  }

  // Browser utilities
  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async clearSessionStorage() {
    await this.page.evaluate(() => sessionStorage.clear());
  }

  async clearAllStorage() {
    await this.clearCookies();
    await this.clearLocalStorage();
    await this.clearSessionStorage();
  }

  // Keyboard utilities
  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async typeText(text: string) {
    await this.page.keyboard.type(text);
  }

  // Mouse utilities
  async hoverElement(locator: any) {
    await locator.hover();
  }

  async rightClickElement(locator: any) {
    await locator.click({ button: 'right' });
  }

  async doubleClickElement(locator: any) {
    await locator.dblclick();
  }

  // File utilities
  async uploadFile(inputLocator: any, filePath: string) {
    await inputLocator.setInputFiles(filePath);
  }

  // Date utilities
  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  static getCurrentDateTime(): string {
    return new Date().toISOString();
  }

  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }
} 