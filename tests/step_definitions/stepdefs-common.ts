import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

Given('the user is on the inventory page', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
  inventoryPage = new InventoryPage(this.page);
});

When('the user goes to the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.goToShoppingCart();
});

Then('the cart should contain the following products:', async function (this: CustomWorld, dataTable) {
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
