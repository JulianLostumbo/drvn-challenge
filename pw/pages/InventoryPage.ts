import { Page, Locator } from 'playwright';

export class InventoryPage {
  private page: Page;

  private inventoryItem: Locator;
  private addToCartButton: Locator;
  private cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('.inventory_item');
    this.addToCartButton = page.locator('.inventory_item button');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async isProductVisible(): Promise<boolean> {
    return this.inventoryItem.first().isVisible();
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItem.count();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButton.first().click();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
