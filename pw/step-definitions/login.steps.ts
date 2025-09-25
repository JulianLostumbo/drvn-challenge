import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Before(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 200 });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});

After(async () => {
  await browser.close();
});

Given('I open the login page', { timeout: 15000 }, async () => {
  await loginPage.goto();
});

When('I log in with {string} and {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('I land on the inventory page and see at least one product', async () => {
  await expect(page).toHaveURL(/.*inventory.html/);

  const visible = await inventoryPage.isProductVisible();
  
  await expect(visible).toBe(true);

  const count = await inventoryPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});