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
  await loginPage.loginToApp(userType === 'standard user' ? 'standard_user' : 'locked_out_user', process.env.PASSWORD_ALL_USERS || 'secret_sauce');
});

Given('I am at {string}', {timeout: 15000}, async (pageName: string) => {
  await loginPage.loginToApp(process.env.USER_STANDARD || 'standard_user', process.env.PASSWORD_ALL_USERS || 'secret_sauce');
  const page = loginPage.getPagePath(pageName as any);
  if (!page) {
    throw new Error(`Page "${pageName}" not found in pages.json`);
  }
  await loginPage.goToPage(page);
});

When('I add any product to the cart', async () => {
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.goToCart();
  await cartPage.clickCheckout();
});

When('I fill First Name, Last Name, Postal Code with any valid values', {timeout: 15000}, async () => {
  const randomFirstName = `User${Math.floor(Math.random() * 1000)}`;
  const randomLastName = `Test${Math.floor(Math.random() * 1000)}`;
  const randomPostalCode = Math.floor(10000 + Math.random() * 89999).toString(); // 5-digit zip
  await checkoutPage.fillInformation(randomFirstName, randomLastName, randomPostalCode);
});

When('I complete the checkout', async () => {
  await checkoutPage.completeCheckout();
});

When('I leave the {string} empty and click {string}', async (fieldName: string, buttonName: string) => {
  await checkoutPage.fillInformationLeavingMissingField(fieldName as "First Name" | "Last Name" | "Postal Code");
  await checkoutPage.clickButton(buttonName as "Continue" | "Cancel");
});

Then('I see the {string} confirmation', async (expectedMessage: string) => {
  const message = await confirmationPage.getConfirmationMessage();
  await expect(message).not.toBeNull();
  await expect(message!).toContain(expectedMessage);
});

Then('I see the error message about the missing field', async () => {
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toHaveText(/Postal Code is required/);
});