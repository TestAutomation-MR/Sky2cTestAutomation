import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginTestPage } from './LoginTestPage';

export class TruckEnquiryPage extends BasePage {
    // Locators
    public static profileAvatar: Locator;
    public static myProfile: Locator;
    public static logoutButton: Locator;
    public static profileNameText: Locator;
    public static profileEmailIdText:Locator;
    public static contactUsMobileNumber: Locator;
    public static contactUsEmailId: Locator;
    public static profileDetailsPopup:Locator;
    public static truckAIAssitToggleBTn:Locator;
    public static enquiryHistoryPage:Locator;
    public static myOrdersPage:Locator;
    public static ecommPage:Locator;
    public static freightBooking:Locator;
    public static sky2cLogo:Locator;
    public static airTab:Locator;
    public static truckTab:Locator;
    public static otherServices:Locator;
    public static otherServicesType:Locator;
    public static contactUsCTAButton: Locator;
    public static originInputBox: Locator;
    public static destinationInputBox: Locator;
    public static dateselector: Locator;
    public static lTLLoadField: Locator;
    public static shipmentDetailField: Locator;
    public static shipmentDetailFieldDropdown: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize locators
        TruckEnquiryPage.profileAvatar=page.locator("//div[@class='avatar-section']");
        TruckEnquiryPage.logoutButton=page.locator("//span[normalize-space()='Log Out']");
        TruckEnquiryPage.myProfile=page.locator("//span[normalize-space()='My Profile']");
        TruckEnquiryPage.profileNameText=page.locator("//span[@class='profile-details-popup-name-text']");
        TruckEnquiryPage.profileEmailIdText=page.locator("//span[@class='profile-details-popup-email-text']");
        TruckEnquiryPage.contactUsMobileNumber=page.locator("//a[normalize-space()='+1 (510) 743 - 3300']");
        TruckEnquiryPage.contactUsEmailId=page.locator("//a[normalize-space()='hello@sky2c.com']");
        TruckEnquiryPage.profileDetailsPopup=page.locator("//div[@class='profile-details-popup open']");
        TruckEnquiryPage.truckAIAssitToggleBTn=page.locator("//div[@class='truckingHeaderNew_assist-mode-toggle-container__sMPmA ']");
        TruckEnquiryPage.enquiryHistoryPage=page.locator("//span[normalize-space()='Enquiry History']");
        TruckEnquiryPage.myOrdersPage=page.locator("//span[normalize-space()='My Orders']");
        TruckEnquiryPage.ecommPage=page.locator("//span[normalize-space()='E-commerce Fulfillment']");
        TruckEnquiryPage.freightBooking=page.locator("//span[@class='truckingHeaderNew_trucking-header-e-com-text-active__c3fNX']");
        TruckEnquiryPage.sky2cLogo=page.locator("//img[@alt='brand-logo']");
        TruckEnquiryPage.airTab=page.locator("//button[normalize-space()='Air']");
        TruckEnquiryPage.truckTab=page.locator("//button[normalize-space()='Trucking']");
        TruckEnquiryPage.otherServices=page.locator("//p[normalize-space()='Other Services']");
        TruckEnquiryPage.otherServicesType=page.locator("div[class='enquiryContent'] [class*='pickuplabel']");
        TruckEnquiryPage.contactUsCTAButton = page.locator("//div[@class='contactUsMobileFloating']");
        TruckEnquiryPage.originInputBox = page.locator("//input[@id='combo-box-demo-origin']");
        TruckEnquiryPage.destinationInputBox = page.locator("//input[@id='combo-box-demo-destination']");
        TruckEnquiryPage.dateselector = page.locator("//div[@id='filter_start_date_desktop']");
        TruckEnquiryPage.lTLLoadField=page.locator(".custom-select-display");
        TruckEnquiryPage.shipmentDetailField = page.locator(".shipment-details-box");
        TruckEnquiryPage.shipmentDetailFieldDropdown = page.locator("//div[contains(@class,'dropdownIcon-containertruck')]/div[1]");

    }

    /**
   * Clicks the 'Profile Avatar' button and waits for profile menu to appear.
   * @param page Playwright Page object
   */
  public static async clickProfileAvatarButton(page:Page): Promise<void> {
    const avatar = TruckEnquiryPage.profileAvatar;
    const profileMenu = TruckEnquiryPage.myProfile;

    await avatar.click();

    await profileMenu.first().waitFor({
      state: 'visible',
      timeout: 5000,
    });
  }

  public static async verifyProfileAvatarVisible(): Promise<boolean> {
    try {
      const avatar = TruckEnquiryPage.profileAvatar;
      return await avatar.isVisible();
    } catch (error) {
      // If locator is not found or an error occurs, return false
      return false;
    }
  }

   /**
   * Clicks the logout  button and waits for signup button to appear.
   * @param page Playwright Page object
   */
   public static async clickOnLogout(page: Page): Promise<void> {
    const logoutbtn=TruckEnquiryPage.logoutButton;
    await logoutbtn.click();

    const loginorsignupButton = LoginTestPage.loginOrSignupButton;
    await loginorsignupButton.first().waitFor({
      state: 'visible',
      timeout: 5000,
    });
  }

  /**
   * Switches between Air and Truck tabs based on the provided URL.
   * @param page Playwright Page object
   * @param url The URL to check and determine the tab to click
   */
  public static async switchTabBasedOnUrl(page: Page, url: string): Promise<void> {
    if (url.includes('https://quote.sky2c.com/air')) {
      // If the URL contains 'air', ensure the Air tab is clicked
      if (!page.url().includes('https://quote.sky2c.com/air')) {
        await TruckEnquiryPage.airTab.click();
      }
    } else if (url.includes('https://quote.sky2c.com/')) {
      // If the URL contains the Truck URL, ensure the truck tab is clicked
      if (!page.url().includes('https://quote.sky2c.com/')) {
        await TruckEnquiryPage.truckTab.click();
      }
    }
  }

  /**
   * Checks the presence of specific locators on the truck enquiry landing page.
   * @param page Playwright Page object
   * @param elementName The name of the element to check
   * @returns True if the element is present, false otherwise
   */
  public static async checkElementPresenceInEnquiryLandingPage(page: Page, elementName: string): Promise<boolean> {
    switch (elementName) {
      case 'sky2cLogo':
        return await TruckEnquiryPage.sky2cLogo.isVisible();
      case 'freightBooking':
        return await TruckEnquiryPage.freightBooking.isVisible();
      case 'enquiryHistoryPage':
        return await TruckEnquiryPage.enquiryHistoryPage.isVisible();
      case 'myOrdersPage':
        return await TruckEnquiryPage.myOrdersPage.isVisible();
      case 'ecommPage':
        return await TruckEnquiryPage.ecommPage.isVisible();
      case 'contactUsCTA':
        return await TruckEnquiryPage.contactUsCTAButton.isVisible();
      case 'airTab':
        return await TruckEnquiryPage.airTab.isVisible();
      case 'truckTab':
        return await TruckEnquiryPage.truckTab.isVisible();
      default:
        throw new Error(`Element ${elementName} is not recognized.`);
    }
  }

  /**
   * Verifies if the provided list of services is present in the 'Other Services' section.
   * @param page Playwright Page object
   * @param expectedServices Array of service names to check
   * @returns A boolean indicating whether all expected services are present
   */
  public static async verifyOtherServicesPresence(page: Page, expectedServices: string[]): Promise<boolean> {
    const servicesLocator = TruckEnquiryPage.otherServicesType;
    const servicesText = await servicesLocator.allTextContents();

    // Check if all expected services are present in the retrieved text
    return expectedServices.every(service => servicesText.includes(service));
  }

  /**
   * Clicks on a specific service type in the 'Other Services' section.
   * Reuses the verifyOtherServicesPresence method to ensure the service exists before clicking.
   * @param page Playwright Page object
   * @param serviceName The name of the service to click
   */
  public static async clickOnOtherServiceType(page: Page, serviceName: string): Promise<void> {
    // Verify if the service is present
    const isServicePresent = await TruckEnquiryPage.verifyOtherServicesPresence(page, [serviceName]);

    if (!isServicePresent) {
      throw new Error(`Service '${serviceName}' is not present in the 'Other Services' section.`);
    }

    // Click on the service
    const servicesLocator = TruckEnquiryPage.otherServicesType;
    const serviceElement = servicesLocator.filter({ hasText: serviceName });
    await serviceElement.first().click();
  }

}