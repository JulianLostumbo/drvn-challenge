import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from '../support/world';

Given('I open the login page', { timeout: 15000 }, async function (this: TestWorld) {
  await this.loginPage.goto();
});

When('I log in with {string} and {string}', async function (this: TestWorld, username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('I land on the inventory page and see at least one product', async function (this: TestWorld) {
  await expect(this.page).toHaveURL(/.*inventory.html/);

  const visible = await this.inventoryPage.isProductVisible();

  await expect(visible).toBe(true);

  const count = await this.inventoryPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the error message {string}', async function (this: TestWorld, expectedMessage: string) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});