import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../../pages/login-page';

let loginPage: LoginPage;

Given('the user is on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

Given('the user entered {string} and {string}', async function (this: CustomWorld, username, password) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('he clicks on the login button', async function (this: CustomWorld) {
  await loginPage.clickLogin();
});

Then('he sees {string}', async function (this: CustomWorld, expected: string) {
  if (expected === 'Inventory page') {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  } else if (expected === 'Wrong Credentials Error') {
    await expect(loginPage.errorWrongCredentials).toBeVisible();
  } else if (expected === 'Locked Out Error') {
    await expect(loginPage.errorLockedOut).toBeVisible();
  }
});
