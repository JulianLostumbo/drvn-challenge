import { Page, Locator, expect } from '@playwright/test';

export class ConfirmationPage {
  private page: Page;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeader = page.locator('.complete-header');
  }

  async getConfirmationMessage(): Promise<string | null> {
    await expect(this.confirmationHeader).toBeVisible();
    return this.confirmationHeader.textContent();
  }
}