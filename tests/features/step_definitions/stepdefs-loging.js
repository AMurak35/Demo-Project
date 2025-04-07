const { chromium } = require('playwright');
const assert = require('assert');
const { expect } = require('@playwright/test');
const { Given, When, Then, After } = require('@cucumber/cucumber');

let browser, page;

Given('the user is on the login page', async function () {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
});

Given('the user entered {string} and {string}', async function (username, password) {
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
});

When('he clicks on the login button', async function () {
  await page.click('[data-test="login-button"]');
});

Then('he sees {string}', async function (expected) {
  if (expected === 'Inventory page') {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  } else {
    const errorElement = await page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    const errorText = await errorElement.textContent();

    if (expected === 'Wrong Credentials Error') {
      expect(errorText).toContain('Username and password do not match');
    } else if (expected === 'Locked Out Error') {
      expect(errorText).toContain('Sorry, this user has been locked out');
    }
  }
});
