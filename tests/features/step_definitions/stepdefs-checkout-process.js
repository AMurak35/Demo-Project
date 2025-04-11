const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');

// === Given ===
Given('the user added following products to the cart:', async function (dataTable) {
  const products = dataTable.raw().flat();

  for (const productName of products) {
    const productCard = this.page.locator('.inventory_item_description').filter({ hasText: productName });
    await expect(productCard).toBeVisible();
    const button = productCard.locator('button', { hasText: 'Add to cart' });
    if ((await button.count()) > 0) {
      await button.click();
    }
  }
});

Given('the user started the checkout process', async function () {
  await this.page.click('.shopping_cart_link');
  await this.page.waitForURL('https://www.saucedemo.com/cart.html');
  await this.page.click('[data-test="checkout"]');
  await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
});

Given('the user filled in his personal information', async function () {
  await this.page.fill('[data-test="firstName"]', 'Test');
  await this.page.fill('[data-test="lastName"]', 'Test');
  await this.page.fill('[data-test="postalCode"]', '12345');
});

Given('the user clicked on {string}', async function (buttonText) {
  const button = this.page.locator('[data-test="continue"]', { hasText: buttonText });
  await button.click();
});

Given('the user is on the page {string}', async function (pageName) {
  if (pageName === 'Checkout: Your Information') {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  } else if (pageName === 'Checkout: Overview') {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.page.fill('[data-test="firstName"]', 'Test');
    await this.page.fill('[data-test="lastName"]', 'Test');
    await this.page.fill('[data-test="postalCode"]', '12345');
    await this.page.locator('[data-test="continue"]').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  }
});

// === When ===
When('he finishes the checkout', async function () {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await this.page.click('[data-test="finish"]');
});

When('he cancels checkout', async function () {
  await this.page.click('[data-test="cancel"]');
});

// === Then ===
Then('he lands on the {string} page', async function (expectedPage) {
  const pageUrls = {
    Cart: 'https://www.saucedemo.com/cart.html',
    Inventory: 'https://www.saucedemo.com/inventory.html',
    Success: 'https://www.saucedemo.com/checkout-complete.html',
  };

  const expectedUrl = pageUrls[expectedPage];

  await expect(this.page).toHaveURL(expectedUrl);
});
