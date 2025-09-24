import { Page, Locator } from 'playwright';

export class ConfirmationPage {
  private page: Page;

  private confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeader = page.locator('.complete-header');
  }

  async getConfirmationMessage(): Promise<string | null> {
    return this.confirmationHeader.textContent();
  }
}
