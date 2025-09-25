import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(first: string, last: string, postal: string): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(first);

    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(last);

    await expect(this.postalCodeInput).toBeVisible();
    await this.postalCodeInput.fill(postal);
  }

  async clickContinue(): Promise<void> {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  async completeCheckout(): Promise<void> {
    await this.clickContinue();
    await expect(this.finishButton).toBeEnabled();
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}