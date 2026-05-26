/**
 * Test Case: Validate Truck Enquiry Page functinalities
 * Tags: @master @sanity @regression
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page 
 * 3) Enter valid credentials and log in
 * 4) Verify successful login 
 * 5) Check the functionalities of Truck Enquiry Page
 * 6) check the URL of the page
 * 
 */

import { test, expect } from '@playwright/test';
import { LoginTestPage } from '../pages/LoginTestPage';
import { TestConfig } from '../test.config';
import { TruckEnquiryPage } from '../pages/TruckEnquiryPage';

let config: TestConfig;
let loginPage: LoginTestPage;
let truckEnquiryPage: TruckEnquiryPage;

// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  loginPage = new LoginTestPage(page);
  truckEnquiryPage = new TruckEnquiryPage(page);
  await page.goto(config.appUrl); // Navigate to base URL  
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close browser tab (good practice in local/dev run)
});

/**
 * Test Case_01: Validate Truck Enquiry Page functinalities and check the URL and landing page elements
 * Tags: @master @sanity @regression
 * Steps:
 * 1) Navigate to Login page 
 * 2) Enter mobile number and login securely
 * 3) Enter OTP and verify
 * 4) Verify successful login 
 * 5) Check the functionalities of Truck Enquiry Page
 * 6) check the URL of the page
 * 7) Verify the presence of Truck Enquiry Page elements
 * 8) logout from the application
 * 
 */
test('TC01:Verify User lands into Trucking Landing page @regression', async ({ page }) => {
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
  // Assert that the user is redirected to the Truck after login
  await TruckEnquiryPage.switchTabBasedOnUrl(page, config.truckUrl);
  // Assert that the user is redirected to the Truck after login
  expect(page.url()).toBe(config.truckUrl);
  // Verify the presence of Truck Enquiry Page elements
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'airTab');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'truckTab');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'contactUsCTA');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'sky2cLogo');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'freightBooking');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'enquiryHistoryPage');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'myOrdersPage');
  await TruckEnquiryPage.checkElementPresenceInEnquiryLandingPage(page, 'ecommPage');
  //click on profile avatar
  TruckEnquiryPage.clickProfileAvatarButton(page);
  //click on logout button
  await TruckEnquiryPage.clickOnLogout(page);
  // Assert that the URL is exactly as expected
  expect(page.url()).toBe('https://quote.sky2c.com/login');

}
)