import { Locator, Page } from "@playwright/test";


export class LoginTestPage{
  static clickOnLoginSuccessfulMsgCloseIcon() {
    throw new Error('Method not implemented.');
  }
  static isVerifyOTPButtonEnabled() {
    throw new Error('Method not implemented.');
  }
  static isLoginButtonEnabled() {
    throw new Error('Method not implemented.');
  }
  static validateSuccessfulLoginMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  static clickVerifyOTPButton() {
    throw new Error('Method not implemented.');
  }
  static enterOTP(arg0: string) {
    throw new Error('Method not implemented.');
  }
  static clickLoginSecurelyButton() {
    throw new Error('Method not implemented.');
  }
  static enterMobileNumber(arg0: string) {
    throw new Error('Method not implemented.');
  }
  static selectCountryCodeUSA() {
    throw new Error('Method not implemented.');
  }

    readonly page: Page;
    
    //Locators
    readonly phoneNofield: Locator ;
    readonly dropdownSelector:Locator;
    readonly countryList:Locator;
    readonly loginSecurelyButton:Locator;
    readonly loginOrSignupButton:Locator;
    readonly otpInputFields:Locator;
    readonly verifyOTPButton:Locator;
    readonly resendOTPButton:Locator;
    readonly loginSuccessfullyMsg:Locator;
    readonly fullNameField: Locator;
    readonly emailIdField: Locator;
    readonly shippingAsComboBox:Locator;
    readonly shippingTypes:Locator;
    readonly loginSuccessfulMsgCloseIcon:Locator;
    readonly popUpMSgAfterSelectingIndividual: Locator;
    readonly goBackButton: Locator;
    readonly editMobileNumber: Locator;
    readonly successfulAccountCreationMsg: Locator;
    readonly signUpSecurelyButton: Locator;
  static loginOrSignupButton: any;

    constructor(page:Page){
        this.page=page;
        // Using more robust selectors like getByRole, getByPlaceholderText, and stable IDs/classes.
        this.phoneNofield=page.locator("#phoneNumber");
        this.dropdownSelector=page.locator(".MuiInputBase-root.MuiOutlinedInput-root"); // A more generic but potentially more stable selector
        this.countryList= page.getByRole('option');
        this.loginSecurelyButton=page.getByRole('button', { name: 'Login Securely' });
        this.signUpSecurelyButton=page.getByRole('button', { name: 'Sign Up Securely' });
        this.loginOrSignupButton=page.locator("div.auth-footer a");
        this.otpInputFields=page.locator('.otp-login-modal-otp-inputs input');
        this.verifyOTPButton=page.getByRole('button', { name: 'Verify OTP' });
        this.resendOTPButton=page.getByRole('button', { name: 'Resend OTP' });
        this.loginSuccessfullyMsg=page.locator("p:has-text('Login successful')"); // Example, adjust text as needed
        this.fullNameField=page.getByPlaceholder('John');
        this.emailIdField=page.getByPlaceholder('Email ID');
        this.editMobileNumber=page.getByRole('button', { name: 'Edit' });
        this.shippingAsComboBox=page.locator(".auth-shipping-as").getByRole('combobox');
        this.shippingTypes=page.getByRole('option');
        this.loginSuccessfulMsgCloseIcon=page.getByRole('button', { name: 'Close' });
        this.popUpMSgAfterSelectingIndividual=page.locator('div:has-text("For shipping as an individual")'); // More robust
        this.goBackButton = page.getByRole('button', { name: 'Go Back' });
        this.successfulAccountCreationMsg = page.locator(".MuiAlert-message");
      }

    /**
     * Clicks the login button on Signup Page
     */
    async clickLogin(){
        await this.loginOrSignupButton.click();
    }
    /**
     * Clicks the close icon of Login Successul popup message
     */
    async clickOnLoginSuccessfulMsgCloseIcon(){
        await this.loginSuccessfulMsgCloseIcon.first().waitFor({ state: 'visible', timeout: 5000 });
        await this.loginSuccessfulMsgCloseIcon.click();
    }

    /**
     * Clicks an element matching the given text (e.g., "Login" or "Signup") and returns true if clicked.
     * Returns false if the element is not found or not visible.
     * 

     * @param text The exact text of the element to click (e.g., "Login", "Signup")
     */
    async clickLoginSignupTextIfVisible(text: string): Promise<boolean> {
        const locator = this.page.locator(`text=${text}`);
      
        if (await locator.isVisible()) {
          await locator.click();
          return true;
        }

        return false;
    }

    /**
     * Selects a country code from the dropdown list by country name.
     * 
     * @param countryName The name of the country to select (e.g., 'United States', 'India', 'Canada')
     * @returns The selected country text if found
     * @throws Error if the country is not found in the dropdown
     */
    async selectCountryCode(countryName: string): Promise<string> {
        try {
            // Step 1: Open the country code dropdown
            await this.dropdownSelector.first().click(); // Use first() if selector is not unique
            console.log(`Attempting to select country: ${countryName}`);

            // Step 2: Get all options
            const options: Locator = this.countryList;
            const count = await options.count();

            // Step 3: Iterate through options to find the matching country
            for (let i = 0; i < count; i++) {
                const optionText = await options.nth(i).innerText();
                if (optionText.toLowerCase().includes(countryName.toLowerCase())) {
                    await options.nth(i).click();
                    console.log(`Selected country: ${optionText}`);
                    return optionText;
                }
            }

            // If we get here, the country wasn't found
            throw new Error(`Country '${countryName}' not found in the dropdown`);
        } catch (error) {
            console.error(`Error selecting country code: ${(error as Error).message}`);
            throw error;
        }
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use selectCountryCode('United States') instead
     */
    async selectCountryCodeUSA(): Promise<void> {
        await this.selectCountryCode('United States');
    }

    /**
     * Enters the given mobile number in the phone number field
     */
    async enterMobileNumber(mobileNumber: string) {
        await this.phoneNofield.fill(mobileNumber);
    }

    /**
     * Clicks the 'Login Securely' button
     */
    async clickLoginSecurelyButton() {
        await this.loginSecurelyButton.click();
        // Wait for OTP input fields to be visible after clicking
        await this.otpInputFields.first().waitFor({ state: 'visible', timeout: 5000 });
    }

    /**
     * Enters the given OTP in the OTP input fields
     */
    async enterOTP(otp: string) {
        const otpInputs = this.otpInputFields;
        for (let i = 0; i < otp.length; i++) {
            await otpInputs.nth(i).fill(otp[i]);
        }
    }

    /**
     * Clicks the 'Verify OTP' button if it's enabled
     * @throws Error if the button is disabled
     */
    async clickVerifyOTPButton() {
        if (await this.isVerifyOTPButtonEnabled()) {
            await this.verifyOTPButton.click();
            // Wait for the click action to complete and any subsequent page changes
            await this.page.waitForTimeout(2000);
        } else {
            throw new Error('Cannot click Verify OTP button - button is disabled');
        }
    }

    /**
     * Checks if the 'Verify OTP' button is enabled
     * @returns true if enabled, false if disabled
     */
    async isVerifyOTPButtonEnabled(): Promise<boolean> {
        try {
            const button = this.verifyOTPButton;
            await button.waitFor({ state: 'attached', timeout: 5000 });
            const classAttr = await button.getAttribute('class') || '';
            return !classAttr.includes('disabled');
        } catch (error) {
            console.log('Error checking Verify OTP button state: ', error);
            return false;
        }
    }

    /**
     * Waits for the Verify OTP button to become enabled
     * @param timeout Maximum time to wait in milliseconds
     * @returns true if button became enabled, false if timeout occurred
     */
    async waitForVerifyOTPButtonEnabled(timeout: number = 10000): Promise<boolean> {
        try {
            const startTime = Date.now();
            while (Date.now() - startTime < timeout) {
                if (await this.isVerifyOTPButtonEnabled()) {
                    return true;
                }
                await this.page.waitForTimeout(500); // Check every 500ms
            }
            return false;
        } catch (error) {
            console.log('Error waiting for Verify OTP button to enable: ', error);
            return false;
        }
    }

    /**
     * Checks the visibility and state of the 'Resend OTP' button
     * @returns Object containing visibility and enabled state of the button
     */
    async checkResendOTPButtonState(): Promise<{ isVisible: boolean; isEnabled: boolean }> {
        try {
            // First check if the button is visible
            const isVisible = await this.resendOTPButton.isVisible();
            
            if (!isVisible) {
                return { isVisible: false, isEnabled: false };
            }

            // If visible, wait for it to be attached to DOM and check if it's enabled
            await this.resendOTPButton.waitFor({ state: 'attached', timeout: 5000 });
            const classAttr = await this.resendOTPButton.getAttribute('class') || '';
            const isEnabled = !classAttr.includes('disabled');

            console.log(`Resend OTP button state - Visible: ${isVisible}, Enabled: ${isEnabled}`);
            return { isVisible, isEnabled };
        } catch (error) {
            console.log('Error checking Resend OTP button state: ', error);
            return { isVisible: false, isEnabled: false };
        }
    }

    /**
     * Clicks the Resend OTP button if it's visible and enabled
     * @returns true if click was successful, false otherwise
     */
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

            await this.resendOTPButton.click();
            await this.page.waitForTimeout(2000); // Wait for any post-click actions
            return true;
        } catch (error) {
            console.log('Error clicking Resend OTP button:', error);
            return false;
        }
    }

    /**
     * Validates the successful Account creation message
     */
    async validateSuccessfulAccountCreationMessage(expectedMessage: string): Promise<boolean> {
        await this.successfulAccountCreationMsg.waitFor({ state: 'visible' });
        const actualMessage = await this.successfulAccountCreationMsg.textContent();
        if (!actualMessage || !actualMessage.includes(expectedMessage)) {
            return false;
        }
        return true;
    }

    /**
     * Checks if the login button is enabled based on its class attribute.
     * The button is considered disabled if its class includes the word "disabled".
     *
     * @returns true if enabled, false if disabled
     */
    async isLoginButtonEnabled(): Promise<boolean> {
        const button = this.page.locator('.otp-login-modal-phone-button');

        // Wait for button to be attached to DOM
        await button.waitFor({ state: 'attached' });

        // Get the class attribute
        const classValue = await button.getAttribute('class');

        // If class contains 'disabled', the button is considered disabled
        const isDisabled = classValue?.includes('disabled') ?? false;

        return !isDisabled; // true if enabled, false if disabled
    }

    /**
     * Checks if the given text (Login or Signup) is visible in the auth footer link
     * @param text The exact text to check for (e.g., 'Login' or 'Signup')
     * @returns true if visible, false otherwise
     */
    async isAuthFooterTextVisible(text: string): Promise<boolean> {
        const locator = this.page.locator("div[class='auth-footer'] p a", { hasText: text });
        return await locator.isVisible();
    }

    /**
     * Enters the given full name in the full name field
     */
    async enterFullName(name: string) {
        await this.fullNameField.fill(name);
    }
    /**
     * Enters the given email id in the EMAILID field
     */
    async enterEmailId(email: string) {
        await this.emailIdField.fill(email);
    }

    /**
     * Selects a shipping type and handles the subsequent workflow.
     * If Individual is selected, it handles the popup and navigation.
     * @param shippingType The shipping type to select ('Business' or 'Individual')
     * @throws Error if any step in the process fails
     */
    async selectShippingTypeAndHandleFlow(shippingType: string): Promise<void> {
        // Validate input
        const validTypes = ['business', 'individual'];
        const normalizedType = shippingType.toLowerCase();
        
        if (!validTypes.includes(normalizedType)) {
            throw new Error(`Invalid shipping type. Expected 'Business' or 'Individual', got '${shippingType}'`);
        }

        try {
            // Open the shipping type combobox
            await this.shippingAsComboBox.click();
            console.log('Opened shipping type dropdown');

            // Get all shipping type options
            const options = this.shippingTypes;
            const count = await options.count();
            console.log('Shipping type options count:', count);

            // Iterate through options to find and click the matching one
            let found = false;
            for (let i = 0; i < count; i++) {
                const optionText = await options.nth(i).textContent();
                if (optionText && optionText.toLowerCase().includes(normalizedType)) {
                    // Click the selected option
                    await options.nth(i).click();
                    console.log(`Selected shipping type: ${optionText}`);
                    found = true;

                    // Handle Individual-specific flow
                    if (normalizedType === 'individual') {
                        // Click Login Securely button
                        await this.loginSecurelyButton.click();
                        console.log('Clicked Login Securely button');

                        // Wait for and verify popup appearance
                        const popupVisible = await this.popUpMSgAfterSelectingIndividual.waitFor({ 
                            state: 'visible', 
                            timeout: 5000 
                        }).then(() => true).catch(() => false);

                        if (!popupVisible) {
                            throw new Error('Individual selection popup did not appear');
                        }
                        console.log('Individual selection popup appeared');

                        // Click Go Back button
                        await this.goBackButton.click();
                        console.log('Clicked Go Back button');

                        // Wait for the page to stabilize
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

    
