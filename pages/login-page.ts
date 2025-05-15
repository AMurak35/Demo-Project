import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorWrongCredentials: Locator;
  readonly errorLockedOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorWrongCredentials = page.locator('h3', { hasText: 'Username and password do not match' });
    this.errorLockedOut = page.locator('h3', { hasText: 'Sorry, this user has been locked out' });
  }
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
