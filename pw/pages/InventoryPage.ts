import { Page, Locator, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import selectors from './data/selectors.json';

export class InventoryPage extends PageBase {
  private inventoryItem: Locator;
  private addToCartButton: Locator;
  private cartIcon: Locator;
  private s = selectors['InventoryPage'];

  constructor(page: Page) {
    super(page);
    this.inventoryItem = page.locator(this.s['Inventory Items']);
    this.addToCartButton = page.locator(this.s['Add To Cart Button']);
    this.cartIcon = page.locator(this.s['Cart Icon']);
  }

  /**
   * Checks if at least one product is visible on the inventory page.
   * @returns True if at least one product is visible on the inventory page
   */
  async isProductVisible(): Promise<boolean> {
    await expect(this.inventoryItem.first()).toBeVisible();
    return this.inventoryItem.first().isVisible();
  }

  /**
   * Gets the count of products listed on the inventory page.  
   * @returns The count of products listed on the inventory page.
   */
  async getProductCount(): Promise<number> {
    await expect(this.inventoryItem.first()).toBeVisible();
    return this.inventoryItem.count();
  }

  /**
   * Adds the first product listed on the inventory page to the cart.
   */
  async addFirstProductToCart(): Promise<void> {
    await expect(this.addToCartButton.first()).toBeEnabled();
    await this.addToCartButton.first().click();
  }

  /**
   * Navigates to the cart page by clicking the cart icon.
   */
  async goToCart(): Promise<void> {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
  }
}