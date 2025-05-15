import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';

let inventoryPage: InventoryPage;
let cartPage: CartPage;

Given('the user is on the inventory page', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
});

When('the user {string} {string}', async function (this: CustomWorld, action: string, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  if (action === 'adds') {
    await inventoryPage.addProductToCart(productName);
  } else if (action === 'removes') {
    await inventoryPage.removeProductInventoryPage(productName);
  }
});

Then('the cart should display {string}', async function (this: CustomWorld, countAfter: string) {
  if (countAfter === '0') {
    await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
  } else {
    await expect(inventoryPage.shoppingCartBadge).toHaveText(countAfter);
  }
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
