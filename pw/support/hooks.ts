import dotenv from 'dotenv';
import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { TestWorld } from './world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

dotenv.config();

const isCI = process.env.CI === 'true';

Before(async function (this: TestWorld) {
  // Launch the browser
  const browser = await chromium.launch({
    headless: isCI ? true : false,
    slowMo: isCI ? 0 : 200,
  });

  // Create new context and page
  const context = await browser.newContext();
  const page = await context.newPage();
  // Expose the page and context to all steps
  this.browser = browser;
  this.context = context;
  this.page = page;

  // Instantiate POMs
  this.loginPage = new LoginPage(page);
  this.inventoryPage = new InventoryPage(page);
  this.cartPage = new CartPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.confirmationPage = new ConfirmationPage(page);
});

After(async function (this: TestWorld) {
  // Cleanup after each scenario
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});