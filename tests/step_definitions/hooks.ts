import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';

Before({ tags: '@cart or @checkout' }, async function (this: CustomWorld) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  this.browser = browser;
  this.page = page;
});

Before({ tags: '@login' }, async function (this: CustomWorld) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');

  this.browser = browser;
  this.page = page;
});

After({ tags: '@cart or @login or @checkout' }, async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
  }
});
