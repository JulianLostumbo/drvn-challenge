import { Page, Locator } from 'playwright';

export class LoginPage {
  private page: Page;

  private static readonly BASE_URL = 'https://www.saucedemo.com';

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
    await this.page.goto(LoginPage.BASE_URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}