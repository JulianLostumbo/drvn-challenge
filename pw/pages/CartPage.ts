import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private page: Page;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clickCheckout(): Promise<void> {
    await expect(this.checkoutButton).toBeEnabled();
    await this.checkoutButton.click();
  }
}