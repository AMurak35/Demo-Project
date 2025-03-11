import { Browser, chromium, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/login-page';

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLogin();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //Save the state of the webpage
  await page.context().storageState({ path: 'LoginAuth.json' });

  await browser.close();
}

export default globalSetup;
