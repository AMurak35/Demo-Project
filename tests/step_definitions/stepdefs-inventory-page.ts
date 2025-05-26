import { Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { InventoryPage } from '../../pages/inventory-page';

let inventoryPage: InventoryPage;

Then('the cart should display {string}', async function (this: CustomWorld, countAfter: string) {
  inventoryPage = new InventoryPage(this.page);
  if (countAfter === '0') {
    await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
  } else {
    await expect(inventoryPage.shoppingCartBadge).toHaveText(countAfter);
  }
});
