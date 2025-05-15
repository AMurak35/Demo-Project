import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;

Given('the user is on the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  await cartPage.goTo();
});

When('the user goes to the inventory page', async function (this: CustomWorld) {
  await inventoryPage.goto();
});

When('the user adds {string} to the cart', async function (this: CustomWorld, productName: string) {
  await inventoryPage.addProductToCart(productName);
});

When('the user removes {string} from the inventory page', async function (this: CustomWorld, productName: string) {
  await inventoryPage.removeProductInventoryPage(productName);
});

When('the user clicks the continue shopping button', async function (this: CustomWorld) {
  await cartPage.continueShoppingButtonClick();
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
