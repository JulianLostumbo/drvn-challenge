import { Page, Locator, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import selectors from './selectors.json';

export class CheckoutPage extends PageBase {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  readonly errorMessage: Locator;
  private cancelButton: Locator;
  private s = selectors['CheckoutPage'];

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator(this.s['First Name']);
    this.lastNameInput = page.locator(this.s['Last Name']);
    this.postalCodeInput = page.locator(this.s['Postal Code']);
    this.continueButton = page.locator(this.s['Continue']);
    this.cancelButton = page.locator(this.s['Cancel']);
    this.finishButton = page.locator(this.s['Finish']);
    this.errorMessage = page.locator(this.s['Error Message']);
  }

  /**
   * Fills in the shipping information.
   * @param first The first name
   * @param last The last name
   * @param postal The postal code
   */
  async fillInformation(first: string, last: string, postal: string): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(first);

    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(last);

    await expect(this.postalCodeInput).toBeVisible();
    await this.postalCodeInput.fill(postal);
  }

  /**
   * Fills in the shipping information leaving the specified field empty.
   * @param fieldName The field name to leave empty: "First Name", "Last Name", or "Postal Code"
   */
  async fillInformationLeavingMissingField(
    fieldName: "First Name" | "Last Name" | "Postal Code"
  ) {
    const randomFirstName = `User${Math.floor(Math.random() * 1000)}`;
    const randomLastName = `Test${Math.floor(Math.random() * 1000)}`;
    const randomPostalCode = Math.floor(10000 + Math.random() * 89999).toString(); // 5-digit zip
    this.fillInformation(randomFirstName, randomLastName, randomPostalCode);
    await this.page.locator(this.s[fieldName]).clear();
  }

  /**
   * Clicks the continue button to proceed with the checkout.
   */
  async clickContinue(): Promise<void> {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  /**
   * Clicks the cancel button to cancel the checkout process.
   */
  async clickCancel() {
    await expect(this.cancelButton).toBeEnabled();
    await this.cancelButton.click();
  }

  /**
   * Clicks the specified button.
   * @param buttonName The name of the button to click: "Continue" or "Cancel"
   */
  async clickButton(
    buttonName: "Continue" | "Cancel"
  ) {
    await this.page.locator(this.s[buttonName]).click();
  }

  /**
   * Completes the checkout process by clicking the continue button and then the finish button.
   */
  async completeCheckout(): Promise<void> {
    await this.clickContinue();
    await expect(this.finishButton).toBeEnabled();
    await this.finishButton.click();
  }

  /**
   * Gets the error message text.
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}