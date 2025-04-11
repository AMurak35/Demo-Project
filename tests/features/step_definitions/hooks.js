const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, page;

Before({ tags: '@cart or @checkout' }, async function () {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  this.browser = browser;
  this.page = page;
});

After({ tags: '@cart or @login or @checkout' }, async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
