const { chromium } = require('playwright');
const assert = require('assert');
const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on the inventory page', async function () {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
});

// === Scenario: Adding/Removing products on the product page ===
// === Given ===
Given('the cart contains the following products:', async function (dataTable) {
  const products = dataTable.raw().flat();

  for (const productName of products) {
    const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addToCartButton = productItem.locator('text="Add to cart"');
    await addToCartButton.click();
  }

  const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText(products.length.toString());
});

// === When ===
When('the user goes to product {string}', async function (pageName) {
  const product = this.page.locator('.inventory_item_description').filter({ hasText: pageName });
  const productItemLink = product.locator('[data-test="inventory-item-name"]');
  await productItemLink.click();
});

When('the user {string} the product', async function (action) {
  if (action === 'adds') {
    const addToCartButton = this.page.locator('text="Add to cart"');
    await addToCartButton.click();
  } else if (action === 'removes') {
    const removeFromCartButton = this.page.locator('button', { hasText: 'Remove' });
    await removeFromCartButton.click();
  }
});

// === Then ===
Then('the cart counter should show {string}', async function (countAfter) {
  const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  if (countAfter === '0') {
    await expect(cartBadge).toHaveCount(0);
  } else {
    await expect(cartBadge).toHaveText(countAfter);
  }
});

// === Scenario: Adding/Removing multiple products and checking the cart ===
// === When ===
When('the user {string} the following products:', async function (action, dataTable) {
  const products = dataTable.raw().flat();

  for (const productName of products) {
    const productCard = this.page.locator('.inventory_item_description').filter({ hasText: productName });
    await expect(productCard).toBeVisible();
    const button = productCard.locator('button', { hasText: action === 'adds' ? 'Add to cart' : 'Remove' });
    if ((await button.count()) > 0) {
      await button.click();
    }
  }
});

// === Then ===
Then('the cart should contain the following products:', async function (dataTable) {
  const expectedProducts = dataTable.raw().flat();

  console.log('📦 Erwartete Produkte:', expectedProducts);
  await expect(this.page.locator('.shopping_cart_link')).toBeVisible();
  await this.page.click('.shopping_cart_link');
  await this.page.waitForURL('https://www.saucedemo.com/cart.html');
  console.log('✅ Cart loaded!');

  const cartItems = this.page.locator('.cart_item');

  for (const productName of expectedProducts) {
    console.log(`🔍 Suche nach Produkt im Warenkorb: "${productName}"`);
    const match = this.page.locator('.cart_item').filter({ hasText: productName });
    await expect(match).toHaveCount(1);
    console.log(`✅ Genau ein Treffer gefunden für "${productName}"`);
  }

  await expect(cartItems).toHaveCount(expectedProducts.length);
});
