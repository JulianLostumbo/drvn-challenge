import { Page, Locator, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import selectors from './data/selectors.json';

export class LoginPage extends PageBase {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private s = selectors['LoginPage'];

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(this.s['Username']);
    this.passwordInput = page.locator(this.s['Password']);
    this.loginButton = page.locator(this.s['Login Button']);
    this.errorMessage = page.locator(this.s['Error Message']);
  }

  /**
   * Navigates to the login page and waits for it to load.
   */
  async goto(): Promise<void> {
    const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.usernameInput).toBeVisible();
  }

  /**
   * Logs in to the application.
   * @param username The username to log in with.
   * @param password The password to log in with.
   */
  async login(username: string, password: string): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  /**
   * Navigates to the login page and waits for it to load. Then logs in to the application.
   * @param username The username to log in with.
   * @param password The password to log in with.
   */
  async loginToApp(username: string, password: string): Promise<void> {
    await this.goto();
    await this.login(username, password);
  }

  /**
   * Retrieves the error message displayed on the login page, if any.
   * @returns The error message text if present, otherwise an empty string.
   */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.textContent()) ?? '';
  }
}