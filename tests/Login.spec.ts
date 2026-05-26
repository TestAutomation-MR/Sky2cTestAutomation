import { test, expect } from '@playwright/test';

test('TC01:Sample test to validate test setup @regression', async ({ page }) => {
    // Navigate to base URL   
    await page.goto('https://www.google.com/');

    // Assert that the URL is exactly as expected
    expect(page.url()).toBe('https://www.google.com/');
    console.log("Sample test executed successfully");

    // Search for "Playwright Testing"
    await page.locator('input[name="q"]').waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('input[name="q"]').fill('Playwright Testing');
    await page.locator('input[name="q"]').press('Enter');
    
    // Wait for and verify first result
    const firstResult = page.locator('h3').first();
    await expect(firstResult).toBeVisible({ timeout: 5000 });
    console.log("First search result title:", await firstResult.textContent());

    // Take screenshot of results
    await page.screenshot({ 
        path: `test-results/search-${Date.now()}.png`, 
        fullPage: true 
    });
});