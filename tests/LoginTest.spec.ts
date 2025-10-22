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
import { TruckEnquiryPage } from '../pages/TruckEnquiryPage';
import { TestConfig } from '../test.config';  

let config: TestConfig;

// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  new LoginTestPage(page); // just call the constructor, don't assign to loginPage
  new TruckEnquiryPage(page);
  // Maximize window (set viewport to screen size)
  const { width, height } = await page.evaluate(() => ({
    width: window.screen.width,
    height: window.screen.height
  }));
  await page.setViewportSize({ width, height });
  await page.goto(config.appUrl); // Navigate to base URL  
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close browser tab (good practice in local/dev run)
});


test('TC01:User login test @regression',async({ page })=>{    
     // Assert that the URL is exactly as expected
    expect(page.url()).toBe('https://quote.sky2c.com/login'); 
    //click on dropdown and select country code USA
     await LoginTestPage.selectCountryCodeUSA();
     //enter phone number
     await LoginTestPage.enterMobileNumber('6157635478');
     //click on login securely button
     await LoginTestPage.clickLoginSecurelyButton();
     //enter OTP
     await LoginTestPage.enterOTP('6512');
     await LoginTestPage.clickVerifyOTPButton();
     //check if login successfully message is present
     const isLoginSuccessfullyMsgPresent = await LoginTestPage.validateSuccessfulLoginMessage("Login Successful");
     expect(isLoginSuccessfullyMsgPresent).toBe(true);

}
)

test('TC01:User login test and validate that OTP/Verify button is enabled or not and check the login successful message @regression',async({ page })=>{    
  // Assert that the URL is exactly as expected
 expect(page.url()).toBe('https://quote.sky2c.com/login'); 
 //click on dropdown and select country code USA
  await LoginTestPage.selectCountryCodeUSA();
  //check login button is disabled
  const loginBtnStatus = await LoginTestPage.isLoginButtonEnabled();
  console.log("loginBtnEnabled status:-", loginBtnStatus);
  expect(loginBtnStatus).toBe(false);
  //enter phone number
  await LoginTestPage.enterMobileNumber('6157635478');
  //check login button is enabled
  const loginBtnStatusAfter = await LoginTestPage.isLoginButtonEnabled();
  console.log("loginBtnEnabled after entering phone number:", loginBtnStatusAfter);
  expect(loginBtnStatusAfter).toBe(true);
  //click on login securely button
  await LoginTestPage.clickLoginSecurelyButton();
  //check if verify OTP button is disabled
  const isEnabled = await LoginTestPage.isVerifyOTPButtonEnabled();
  console.log("isEnabled status:-", isEnabled);
  expect(isEnabled).toBe(false);
  //enter OTP
  await LoginTestPage.enterOTP('6512');
  //click on login button
  await LoginTestPage.clickVerifyOTPButton();
  //check if login successfully message is present
  const isLoginSuccessfullyMsgPresent = await LoginTestPage.validateSuccessfulLoginMessage("Login Successful");
  expect(isLoginSuccessfullyMsgPresent).toBe(true);
  //click on close icon of login successful pop up msg
  await LoginTestPage.clickOnLoginSuccessfulMsgCloseIcon();
  console.log('Actual URL after login:', page.url());
  expect(page.url()).toContain(config.truckUrl);
  //verfiying prifile avatar is visible or not
  const isAvatarVisible=await TruckEnquiryPage.verifyProfileAvatarVisible();
  expect(isAvatarVisible).toBe(true);
  // Click on profile avatar button
  await TruckEnquiryPage.clickProfileAvatarButton(page);
  // click on logout button
  await TruckEnquiryPage.clickOnLogout(page);
  // Assert that the URL is exactly as expected
 expect(page.url()).toBe('https://quote.sky2c.com/login'); 
}
)
