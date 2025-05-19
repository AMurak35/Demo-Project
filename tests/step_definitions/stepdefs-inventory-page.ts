import { When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';

let inventoryPage: InventoryPage;
let cartPage: CartPage;

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
