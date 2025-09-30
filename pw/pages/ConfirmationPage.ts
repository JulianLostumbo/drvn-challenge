import { Page, Locator, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import selectors from './data/selectors.json';

export class ConfirmationPage extends PageBase {
  readonly confirmationHeader: Locator;
  private s = selectors['ConfirmationPage'];

  constructor(page: Page) {
    super(page);
    this.confirmationHeader = page.locator(this.s['Confirmation Header']);
  }

  /**
   * Gets the confirmation message text.
   * @returns The confirmation message text
   */
  async getConfirmationMessage(): Promise<string | null> {
    await expect(this.confirmationHeader).toBeVisible();
    return this.confirmationHeader.textContent();
  }
}