import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { CustomWorld } from './world';
import { ProductPage } from '../../pages/product-page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

Given('the user is on the inventory page', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
  inventoryPage = new InventoryPage(this.page);
});

Given('the user is on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

Given('the user entered {string} and {string}', async function (this: CustomWorld, username, password) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('the user goes to the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  await inventoryPage.goToShoppingCart();
});

When('he clicks on the login button', async function (this: CustomWorld) {
  await loginPage.clickLogin();
});

When('the user {string} {string}', async function (this: CustomWorld, action: string, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  if (action === 'adds') {
    await inventoryPage.addProductToCart(productName);
  } else if (action === 'removes') {
    await inventoryPage.removeProductInventoryPage(productName);
  }
});

When('the user opens the product page for {string}', async function (this: CustomWorld, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.goToProductItemPage(productName);
});

When('the user {string} the product', async function (this: CustomWorld, action: string) {
  productPage = new ProductPage(this.page);
  if (action === 'adds') {
    await productPage.addToCartButtonClick();
  } else if (action === 'removes') {
    await productPage.removeFromCartButtonClick();
  }
});

When('the user navigates back to the inventory page', async function (this: CustomWorld) {
  await productPage.goBackToProducts();
});

When('the user starts the checkout process', async function (this: CustomWorld) {
  cartPage = new CartPage(this.page);
  await cartPage.goToCheckoutProcess();
});

When(
  'the user enters the checkout data {string}, {string}, {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillInDataForCheckout(firstName, lastName, postalCode);
  }
);

When('the user continues the checkout', async function (this: CustomWorld) {
  await checkoutPage.continueCheckoutButtonClick();
});

When('the user is on the page {string}', async function (this: CustomWorld, pageName: string) {
  if (pageName === 'Checkout: Overview') {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  } else if (pageName === 'Checkout: Information') {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  }
});

When('the user {string} the checkout', async function (this: CustomWorld, action: string) {
  if (action === 'finishes') {
    await checkoutPage.finishCheckoutButtonClick();
  } else if (action === 'cancels') {
    await checkoutPage.cancelCheckoutButtonClick();
  } else {
    throw new Error(`Unknown checkout action: ${action}`);
  }
});

Then('the cart should contain the following products:', async function (this: CustomWorld, dataTable) {
  inventoryPage = new InventoryPage(this.page);
  const expectedProducts = dataTable.raw().flat();

  await expect(inventoryPage.shoppingCart).toBeVisible();
  await inventoryPage.goToShoppingCart();
  await this.page.waitForURL('https://www.saucedemo.com/cart.html');

  cartPage = new CartPage(this.page);

  for (const productName of expectedProducts) {
    const match = cartPage.cartItemsOnCartPage.filter({ hasText: productName });
    await expect(match).toHaveCount(1);
  }

  await expect(cartPage.cartItemsOnCartPage).toHaveCount(expectedProducts.length);
});

Then('the cart should contain {string} items', async function (this: CustomWorld, countAfter: string) {
  let badgeCount = 0;
  if (await cartPage.shoppingCartBadge.isVisible()) {
    const badgeText = await cartPage.shoppingCartBadge.textContent();
    badgeCount = badgeText ? parseInt(badgeText) : 0;
  }

  const itemsOnCartPage = await cartPage.cartItemsOnCartPage.count();

  // Product items on the cart page
  if (parseInt(countAfter) >= 1) {
    expect(itemsOnCartPage).toBe(parseInt(countAfter));
  } else {
    await expect(cartPage.cartItemsOnCartPage).toHaveCount(0);
  }

  // Check the number of the badge
  if (parseInt(countAfter) >= 1) {
    await expect(cartPage.shoppingCartBadge).toHaveText(countAfter);
  } else {
    await expect(cartPage.shoppingCartBadge).not.toBeVisible();
  }
});

Then('he lands on the {string} page', async function (this: CustomWorld, destinationPage: string) {
  inventoryPage = new InventoryPage(this.page);
  if (destinationPage === 'Success') {
    await expect(checkoutPage.completePageTitle).toBeVisible();
    await expect(checkoutPage.completePageHeader).toBeVisible();
  } else if (destinationPage === 'Inventory') {
    await expect(inventoryPage.productsPageTitle).toBeVisible();
  } else {
    throw new Error(`Unknown destination page: ${destinationPage}`);
  }
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
