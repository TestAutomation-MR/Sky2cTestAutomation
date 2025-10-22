import { Page, expect } from '@playwright/test';
import { TestConfig } from '../test.config';

export abstract class TestBase {
    protected page: Page;
    protected config: TestConfig;

    constructor(page: Page) {
        this.page = page;
        this.config = new TestConfig();
    }

    /**
     * Navigate to the application URL
     */
    async navigateToApp(): Promise<void> {
        await this.page.goto(this.config.appUrl);
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Take a screenshot and save it with timestamp
     */
    async takeScreenshot(name: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({ 
            path: `screenshots/${name}_${timestamp}.png`,
            fullPage: true 
        });
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { 
            state: 'visible', 
            timeout: timeout 
        });
    }

    /**
     * Wait for element to be attached to DOM
     */
    async waitForElementAttached(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { 
            state: 'attached', 
            timeout: timeout 
        });
    }

    /**
     * Click element with retry mechanism
     */
    async clickWithRetry(selector: string, maxRetries: number = 3): Promise<void> {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.page.click(selector);
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Fill input field with retry mechanism
     */
    async fillWithRetry(selector: string, value: string, maxRetries: number = 3): Promise<void> {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.page.fill(selector, value);
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Assert URL contains expected path
     */
    async assertUrlContains(expectedPath: string): Promise<void> {
        expect(this.page.url()).toContain(expectedPath);
    }

    /**
     * Assert element is visible
     */
    async assertElementVisible(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    /**
     * Assert element is not visible
     */
    async assertElementNotVisible(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).not.toBeVisible();
    }

    /**
     * Assert element text contains expected value
     */
    async assertElementTextContains(selector: string, expectedText: string): Promise<void> {
        await expect(this.page.locator(selector)).toContainText(expectedText);
    }

    /**
     * Get element text
     */
    async getElementText(selector: string): Promise<string> {
        return await this.page.locator(selector).textContent() || '';
    }

    /**
     * Check if element is enabled
     */
    async isElementEnabled(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isEnabled();
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    /**
     * Wait for network request to complete
     */
    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Wait for specific timeout
     */
    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }

    /**
     * Refresh the current page
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    /**
     * Go back to previous page
     */
    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    /**
     * Get current page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Assert page title contains expected text
     */
    async assertPageTitleContains(expectedTitle: string): Promise<void> {
        const title = await this.getPageTitle();
        expect(title).toContain(expectedTitle);
    }

    /**
     * Log test step information
     */
    logStep(step: string): void {
        console.log(`[STEP] ${step}`);
    }

    /**
     * Log test information
     */
    logInfo(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    /**
     * Log test error
     */
    logError(message: string): void {
        console.log(`[ERROR] ${message}`);
    }
} 