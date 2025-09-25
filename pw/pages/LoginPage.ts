import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto(): Promise<void> {
    const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }
}