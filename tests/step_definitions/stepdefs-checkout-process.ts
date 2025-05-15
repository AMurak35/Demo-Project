import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

Given('the user adds the product {string} to the cart', async function (this: CustomWorld, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
  await inventoryPage.goto();
  await inventoryPage.addProductToCart(productName);
});

When('the user starts the checkout process', async function (this: CustomWorld) {
  await cartPage.goToCheckoutProcess();
});

When(
  'the user enters the checkout data {string}, {string}, {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
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

Then('he lands on the {string} page', async function (this: CustomWorld, destinationPage: string) {
  if (destinationPage === 'Success') {
    await expect(checkoutPage.completePageTitle).toBeVisible();
    await expect(checkoutPage.completePageHeader).toBeVisible();
  } else if (destinationPage === 'Inventory') {
    await expect(inventoryPage.productsPageTitle).toBeVisible();
  } else {
    throw new Error(`Unknown destination page: ${destinationPage}`);
  }
});
