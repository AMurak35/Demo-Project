import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';

test('Check added and removed products on the cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToShoppingCart();
    //Expect to have 3 items in the cart
    await cartPage.checkTheItemsInCart();
    await cartPage.continueShoppingButtonClick();
    await inventoryPage.removeProductInventoryPage('Sauce Labs Onesie');
    await inventoryPage.goToShoppingCart();
    //Expect to have 2 items in the cart
    await cartPage.checkTheItemsInCart();
    await cartPage.continueShoppingButtonClick();
    await inventoryPage.removeProductInventoryPage('Sauce Labs Fleece Jacket');
    await inventoryPage.removeProductInventoryPage('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToShoppingCart();
    //Expect to have 0 item in the cart
    await cartPage.checkTheItemsInCart();
});