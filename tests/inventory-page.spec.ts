import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';

test('Add to and remove products from cart on the products page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.removeProductInventoryPage('Sauce Labs Onesie');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.removeProductInventoryPage('Sauce Labs Bike Light');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
});
