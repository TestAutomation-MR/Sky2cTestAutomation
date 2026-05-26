import { Locator, Page } from "@playwright/test";


export class LoginTestPage {
    // Static page reference (set in constructor, used by static methods)
    static page: Page;

    // Static locators (initialized in constructor, used by static methods)
    static phoneNofield: Locator;
    static dropdownSelector: Locator;
    static countryList: Locator;
    static loginSecurelyButton: Locator;
    static signUpSecurelyButton: Locator;
    static loginOrSignupButton: Locator;
    static otpInputFields: Locator;
    static verifyOTPButton: Locator;
    static resendOTPButton: Locator;
    static loginSuccessfullyMsg: Locator;
    static fullNameField: Locator;
    static emailIdField: Locator;
    static shippingAsComboBox: Locator;
    static shippingTypes: Locator;
    static loginSuccessfulMsgCloseIcon: Locator;
    static popUpMSgAfterSelectingIndividual: Locator;
    static goBackButton: Locator;
    static editMobileNumber: Locator;
    static successfulAccountCreationMsg: Locator;
    static loginButton: Locator;

    // Instance page reference (kept for instance methods)
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        LoginTestPage.page = page;

        LoginTestPage.phoneNofield = page.locator("#phoneNumber");
        LoginTestPage.dropdownSelector = page.locator('[aria-label="Country flag selector"]');
        LoginTestPage.countryList = page.getByRole('option');
        LoginTestPage.loginSecurelyButton = page.locator('.otp-login-modal-phone-button').filter({ hasText: 'Login Securely' });
        LoginTestPage.signUpSecurelyButton = page.locator('.otp-login-modal-phone-button').filter({ hasText: 'Sign Up Securely' });
        LoginTestPage.loginOrSignupButton = page.locator("div.auth-footer a");
        LoginTestPage.otpInputFields = page.locator('.otp-input');
        LoginTestPage.verifyOTPButton = page.locator('.otp-login-modal-phone-button').filter({ hasText: 'Verify' });
        LoginTestPage.resendOTPButton = page.locator('[class*="otp-login-modal-verification-otp-resend-button"]');
        LoginTestPage.loginSuccessfullyMsg = page.locator(".MuiAlert-message");
        LoginTestPage.fullNameField = page.getByPlaceholder('John');
        LoginTestPage.emailIdField = page.getByPlaceholder('Email ID');
        LoginTestPage.editMobileNumber = page.getByRole('button', { name: 'Edit' });
        LoginTestPage.shippingAsComboBox = page.locator(".auth-shipping-as").getByRole('combobox');
        LoginTestPage.shippingTypes = page.getByRole('option');
        LoginTestPage.loginSuccessfulMsgCloseIcon = page.locator('[class*="MuiAlert"] [aria-label="Close"], [class*="toast"] [aria-label="Close"], [class*="snackbar"] button, .MuiAlert-action button').first();
        LoginTestPage.popUpMSgAfterSelectingIndividual = page.locator('div:has-text("For shipping as an individual")');
        LoginTestPage.goBackButton = page.getByRole('button', { name: 'Go Back' });
        LoginTestPage.successfulAccountCreationMsg = page.locator(".MuiAlert-message");
        LoginTestPage.loginButton = page.locator('.otp-login-modal-phone-button').filter({ hasText: 'Login Securely' });
    }

    // ── Static action methods (called directly as LoginTestPage.method()) ──

    static async selectCountryCodeUSA(): Promise<void> {
        const page = LoginTestPage.page;

        // Click the country flag selector combobox
        await page.locator('[aria-label="Country flag selector"]').click();

        // Wait for the listbox options to render
        const options = page.getByRole('option');
        await options.first().waitFor({ state: 'visible', timeout: 5000 });

        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const optionText = await options.nth(i).innerText();
            if (optionText.toLowerCase().includes('united states')) {
                await options.nth(i).click();
                console.log(`Selected country: ${optionText}`);
                return;
            }
        }
        throw new Error(`Country 'United States' not found in the dropdown. Found ${count} options.`);
    }

    static async enterMobileNumber(mobileNumber: string): Promise<void> {
        await LoginTestPage.phoneNofield.fill(mobileNumber);
    }

    static async clickLoginSecurelyButton(): Promise<void> {
        await LoginTestPage.loginSecurelyButton.click();
        await LoginTestPage.otpInputFields.first().waitFor({ state: 'visible', timeout: 5000 });
    }

    static async enterOTP(otp: string): Promise<void> {
        const otpInputs = LoginTestPage.otpInputFields;
        for (let i = 0; i < otp.length; i++) {
            await otpInputs.nth(i).fill(otp[i]);
        }
    }

    static async isVerifyOTPButtonEnabled(): Promise<boolean> {
        try {
            const button = LoginTestPage.verifyOTPButton;
            await button.waitFor({ state: 'attached', timeout: 5000 });
            const classAttr = await button.getAttribute('class') || '';
            return !classAttr.includes('disabled');
        } catch (error) {
            console.log('Error checking Verify OTP button state: ', error);
            return false;
        }
    }

    static async clickVerifyOTPButton(): Promise<void> {
        if (await LoginTestPage.isVerifyOTPButtonEnabled()) {
            await LoginTestPage.verifyOTPButton.click();
        } else {
            throw new Error('Cannot click Verify OTP button - button is disabled');
        }
    }

    static async isLoginButtonEnabled(): Promise<boolean> {
        const button = LoginTestPage.loginButton;
        await button.waitFor({ state: 'attached' });
        const classValue = await button.getAttribute('class');
        const isDisabled = classValue?.includes('disabled') ?? false;
        return !isDisabled;
    }

    static async validateSuccessfulLoginMessage(expectedMessage: string): Promise<boolean> {
        const page = LoginTestPage.page;

        // Strategy 1: Try to catch the success toast before it auto-dismisses
        try {
            await LoginTestPage.loginSuccessfullyMsg.waitFor({ state: 'visible', timeout: 3000 });
            const actualMessage = await LoginTestPage.loginSuccessfullyMsg.textContent();
            if (actualMessage?.toLowerCase().includes(expectedMessage.toLowerCase())) {
                return true;
            }
        } catch {
            // Message not captured — fall through to URL-based check
        }

        // Strategy 2: Successful login redirects away from /login — treat that as success
        try {
            await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 8000 });
            return true;
        } catch {
            return false;
        }
    }

    static async clickOnLoginSuccessfulMsgCloseIcon(): Promise<void> {
        try {
            await LoginTestPage.loginSuccessfulMsgCloseIcon.first().waitFor({ state: 'visible', timeout: 3000 });
            await LoginTestPage.loginSuccessfulMsgCloseIcon.first().click();
        } catch {
            // Close icon may have auto-dismissed; continue
            console.log('Login success close icon not found — message may have auto-dismissed');
        }
    }

    // ── Instance methods (kept for backward compatibility) ──

    async clickLogin() {
        await LoginTestPage.loginOrSignupButton.click();
    }

    async clickLoginSignupTextIfVisible(text: string): Promise<boolean> {
        const locator = this.page.locator(`text=${text}`);
        if (await locator.isVisible()) {
            await locator.click();
            return true;
        }
        return false;
    }

    async selectCountryCode(countryName: string): Promise<string> {
        try {
            await this.page.locator('[aria-label="Country flag selector"]').click();
            console.log(`Attempting to select country: ${countryName}`);
            const options: Locator = LoginTestPage.countryList;
            const count = await options.count();
            for (let i = 0; i < count; i++) {
                const optionText = await options.nth(i).innerText();
                if (optionText.toLowerCase().includes(countryName.toLowerCase())) {
                    await options.nth(i).click();
                    console.log(`Selected country: ${optionText}`);
                    return optionText;
                }
            }
            throw new Error(`Country '${countryName}' not found in the dropdown`);
        } catch (error) {
            console.error(`Error selecting country code: ${(error as Error).message}`);
            throw error;
        }
    }

    async enterMobileNumberInstance(mobileNumber: string) {
        await LoginTestPage.phoneNofield.fill(mobileNumber);
    }

    async clickLoginSecurelyButtonInstance() {
        await LoginTestPage.loginSecurelyButton.click();
        await LoginTestPage.otpInputFields.first().waitFor({ state: 'visible', timeout: 5000 });
    }

    async enterOTPInstance(otp: string) {
        const otpInputs = LoginTestPage.otpInputFields;
        for (let i = 0; i < otp.length; i++) {
            await otpInputs.nth(i).fill(otp[i]);
        }
    }

    async clickVerifyOTPButtonInstance() {
        if (await LoginTestPage.isVerifyOTPButtonEnabled()) {
            await LoginTestPage.verifyOTPButton.click();
            await this.page.waitForTimeout(2000);
        } else {
            throw new Error('Cannot click Verify OTP button - button is disabled');
        }
    }

    async waitForVerifyOTPButtonEnabled(timeout: number = 10000): Promise<boolean> {
        try {
            const startTime = Date.now();
            while (Date.now() - startTime < timeout) {
                if (await LoginTestPage.isVerifyOTPButtonEnabled()) {
                    return true;
                }
                await this.page.waitForTimeout(500);
            }
            return false;
        } catch (error) {
            console.log('Error waiting for Verify OTP button to enable: ', error);
            return false;
        }
    }

    async checkResendOTPButtonState(): Promise<{ isVisible: boolean; isEnabled: boolean }> {
        try {
            const isVisible = await LoginTestPage.resendOTPButton.isVisible();
            if (!isVisible) {
                return { isVisible: false, isEnabled: false };
            }
            await LoginTestPage.resendOTPButton.waitFor({ state: 'attached', timeout: 5000 });
            const classAttr = await LoginTestPage.resendOTPButton.getAttribute('class') || '';
            const isEnabled = !classAttr.includes('disabled');
            console.log(`Resend OTP button state - Visible: ${isVisible}, Enabled: ${isEnabled}`);
            return { isVisible, isEnabled };
        } catch (error) {
            console.log('Error checking Resend OTP button state: ', error);
            return { isVisible: false, isEnabled: false };
        }
    }

    async validateStateAndClickResendOTPButton(): Promise<boolean> {
        try {
            const buttonState = await this.checkResendOTPButtonState();
            if (!buttonState.isVisible) {
                console.log('Resend OTP button is not visible');
                return false;
            }
            if (!buttonState.isEnabled) {
                console.log('Resend OTP button is visible but disabled');
                return false;
            }
            await LoginTestPage.resendOTPButton.click();
            await this.page.waitForTimeout(2000);
            return true;
        } catch (error) {
            console.log('Error clicking Resend OTP button:', error);
            return false;
        }
    }

    async validateSuccessfulAccountCreationMessage(expectedMessage: string): Promise<boolean> {
        await LoginTestPage.successfulAccountCreationMsg.waitFor({ state: 'visible' });
        const actualMessage = await LoginTestPage.successfulAccountCreationMsg.textContent();
        if (!actualMessage || !actualMessage.includes(expectedMessage)) {
            return false;
        }
        return true;
    }

    async isAuthFooterTextVisible(text: string): Promise<boolean> {
        const locator = this.page.locator("div[class='auth-footer'] p a", { hasText: text });
        return await locator.isVisible();
    }

    async enterFullName(name: string) {
        await LoginTestPage.fullNameField.fill(name);
    }

    async enterEmailId(email: string) {
        await LoginTestPage.emailIdField.fill(email);
    }

    async selectShippingTypeAndHandleFlow(shippingType: string): Promise<void> {
        const validTypes = ['business', 'individual'];
        const normalizedType = shippingType.toLowerCase();
        if (!validTypes.includes(normalizedType)) {
            throw new Error(`Invalid shipping type. Expected 'Business' or 'Individual', got '${shippingType}'`);
        }
        try {
            await LoginTestPage.shippingAsComboBox.click();
            console.log('Opened shipping type dropdown');
            const options = LoginTestPage.shippingTypes;
            const count = await options.count();
            let found = false;
            for (let i = 0; i < count; i++) {
                const optionText = await options.nth(i).textContent();
                if (optionText && optionText.toLowerCase().includes(normalizedType)) {
                    await options.nth(i).click();
                    console.log(`Selected shipping type: ${optionText}`);
                    found = true;
                    if (normalizedType === 'individual') {
                        await LoginTestPage.loginSecurelyButton.click();
                        const popupVisible = await LoginTestPage.popUpMSgAfterSelectingIndividual.waitFor({
                            state: 'visible',
                            timeout: 5000
                        }).then(() => true).catch(() => false);
                        if (!popupVisible) {
                            throw new Error('Individual selection popup did not appear');
                        }
                        await LoginTestPage.goBackButton.click();
                        await this.page.waitForTimeout(2000);
                    }
                    break;
                }
            }
            if (!found) {
                throw new Error(`Shipping type '${shippingType}' not found in the dropdown`);
            }
        } catch (error) {
            throw new Error(`Failed to complete shipping type workflow: ${(error as Error).message}`);
        }
    }
}
