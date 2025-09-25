import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let confirmationPage: ConfirmationPage;

Before(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 100 });
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  confirmationPage = new ConfirmationPage(page);
});

After(async () => {
  await browser.close();
});

Given('I am logged in as a {string}', {timeout: 15000}, async (userType: string) => {
  await loginPage.goto();
  await loginPage.login(userType === 'standard user' ? 'standard_user' : 'locked_out_user', 'secret_sauce');
});

Given('I am at the checkout information page', {timeout: 15000}, async () => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.clickCheckout();
});

When('I add any product to the cart', async () => {
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.clickCheckout();
});

When('I fill First Name, Last Name, Postal Code with any valid values', async () => {
  await checkoutPage.fillInformation('Juli', 'Lostumbo', '12345');
});

When('I complete the checkout', async () => {
  await checkoutPage.completeCheckout();
});

When('I leave the Postal Code field empty and click Continue', async () => {
  await checkoutPage.fillInformation('Juli', 'Lostumbo', '');
  await checkoutPage.clickContinue();
});

Then('I see {string} confirmation', async (expectedMessage: string) => {
  const message = await confirmationPage.getConfirmationMessage();
  await expect(message).not.toBeNull();
  await expect(message!).toContain(expectedMessage);
});

Then('I see an error message about the missing field', async () => {
  await expect(checkoutPage.errorMessage).toBeVisible();

  await expect(checkoutPage.errorMessage).toHaveText(/Postal Code is required/);
});