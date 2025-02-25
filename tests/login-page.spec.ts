import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('Successfull log in with standard user', async ({ page, context }) => {
  await context.clearCookies();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLogin();

  //Verify successfull log in by navigation to the Inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.pause();
});

test('Unsuccessfull log in with wrong passwort', async ({ page, context }) => {
  await context.clearCookies();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret');
  await loginPage.clickLogin();

  //Verify the error message by wrong password
  await expect(loginPage.errorWrongCredentials).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('Unsuccessfull log in with locked-out user', async ({ page, context }) => {
  await context.clearCookies();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterUsername('locked_out_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLogin();

  //Verify the error message by locked-out user
  await expect(loginPage.errorLockedOut).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
