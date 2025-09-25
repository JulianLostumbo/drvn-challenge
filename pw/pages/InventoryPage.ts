import { Page, Locator, expect } from '@playwright/test';

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
    await expect(this.inventoryItem.first()).toBeVisible();
    return this.inventoryItem.first().isVisible();
  }

  async getProductCount(): Promise<number> {
    await expect(this.inventoryItem.first()).toBeVisible();
    return this.inventoryItem.count();
  }

  async addFirstProductToCart(): Promise<void> {
    await expect(this.addToCartButton.first()).toBeEnabled();
    await this.addToCartButton.first().click();
  }

  async goToCart(): Promise<void> {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
  }
}