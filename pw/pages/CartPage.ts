import { Page, Locator, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import selectors from './selectors.json';

export class CartPage extends PageBase {
  private checkoutButton: Locator;
  private s = selectors['CartPage'];

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator(this.s['Checkout Button']);
  }

  /**
   * Clicks the checkout button to proceed to the checkout page.
   */
  async clickCheckout(): Promise<void> {
    await expect(this.checkoutButton).toBeEnabled();
    await this.checkoutButton.click();
  }
}