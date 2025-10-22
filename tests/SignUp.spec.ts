/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';
import { LoginTestPage } from '../pages/LoginTestPage';
import { TestConfig } from '../test.config';  

let config: TestConfig;
let loginPage: LoginTestPage;

// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  loginPage = new LoginTestPage(page);
  await page.goto(config.appUrl, { timeout: 60000 }); // Increase timeout if needed 
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close browser tab (good practice in local/dev run)
});


test('TC01:New User SignUp test and validate that User get registered successfuly @regression',async({ page })=>{    
     // Assert that the URL is exactly as expected
    expect(page.url()).toBe('https://quote.sky2c.com/login'); 
     // Try to click the "Sign Up" link if visible
    const clicked = await loginPage.clickLoginSignupTextIfVisible( 'Sign Up');
    expect(clicked).toBe(true);
    //Enter full name in SIgnup form
    await loginPage.enterFullName("Test Customer User");
    //Enter Email Id
    await loginPage.enterEmailId("mahesh.sky2c@gmail.com");
     //click on dropdown and select country code USA
    await loginPage.selectCountryCodeUSA();
    //enter phone number
    await loginPage.enterMobileNumber('7073958727');
    //select shipping as individual and handle the pop up message
    await loginPage.selectShippingTypeAndHandleFlow('Individual');
    //select Shipping as business 
    await loginPage.selectShippingTypeAndHandleFlow('Business');
    //click on login securely button
    await loginPage.clickLoginSecurelyButton();
    //enter OTP
    await loginPage.enterOTP('6517');
    await loginPage.clickVerifyOTPButton();
    //check if login successfully message is present
    const isAccountCreationSuccessfullyMsgPresent = await loginPage.validateSuccessfulAccountCreationMessage("Account created. Let's go shipping!");
    expect(isAccountCreationSuccessfullyMsgPresent).toBe(true);
    //click on close button of the pop up
    await loginPage.clickOnLoginSuccessfulMsgCloseIcon();
    // Assert that the user is redirected to the airUrl after login
    expect(page.url()).toBe(config.truckUrl);

}
)
