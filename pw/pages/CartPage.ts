import { Page, Locator } from 'playwright';

export class CartPage {
  private page: Page;

  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
