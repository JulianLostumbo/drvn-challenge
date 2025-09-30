import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from '../support/world';
import {
  generateRandomFirstName,
  generateRandomLastName,
  generateRandomPostalCode,
} from '../utils/data-generator';

let randomFirstName = generateRandomFirstName();
let randomLastName = generateRandomLastName();
let randomPostalCode = generateRandomPostalCode();

Given('I am logged in as a {string}', {timeout: 15000}, async function (this: TestWorld, userType: string) {
  await this.loginPage.loginToApp(userType === 'standard user' ? 'standard_user' : 'locked_out_user', process.env.PASSWORD_ALL_USERS || 'secret_sauce');
});

Given('I am at {string}', {timeout: 15000}, async function (this: TestWorld, pageName: string) {
  await this.loginPage.loginToApp(process.env.USER_STANDARD || 'standard_user', process.env.PASSWORD_ALL_USERS || 'secret_sauce');
  const page = this.loginPage.getPagePath(pageName as any);
  if (!page) {
    throw new Error(`Page "${pageName}" not found in pages.json`);
  }
  await this.loginPage.goToPage(page);
});

When('I add any product to the cart', async function (this: TestWorld) {
  await this.inventoryPage.addFirstProductToCart();
  await this.inventoryPage.goToCart();
  await this.cartPage.clickCheckout();
});

When('I fill First Name, Last Name, Postal Code with any valid values', {timeout: 15000}, async function (this: TestWorld) {
  await this.checkoutPage.fillInformation(randomFirstName, randomLastName, randomPostalCode);
});

When('I complete the checkout', async function (this: TestWorld) {
  await this.checkoutPage.completeCheckout();
});

When('I leave the {string} empty and click {string}', async function (this: TestWorld, fieldName: string, buttonName: string) {
  await this.checkoutPage.fillInformationLeavingMissingField(fieldName as "First Name" | "Last Name" | "Postal Code");
  await this.checkoutPage.clickButton(buttonName as "Continue" | "Cancel");
});

Then('I see the {string} confirmation', async function (this: TestWorld, expectedMessage: string) {
  const message = await this.confirmationPage.getConfirmationMessage();
  await expect(message).not.toBeNull();
  await expect(message!).toContain(expectedMessage);
});

Then('I see the error message about the missing field', {timeout: 15000}, async function (this: TestWorld) {
  await expect(this.checkoutPage.errorMessage).toBeVisible();
  await expect(this.checkoutPage.errorMessage).toHaveText(/Postal Code is required/);
});