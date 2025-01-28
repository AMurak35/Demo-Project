import { expect, test } from '@playwright/test';
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

test('Add products to and remove them from cart on the product item page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.goToProductItemPage('Sauce Labs Backpack');
    await inventoryPage.addToCartButtonClick();
    await inventoryPage.removeFromCartButtonClick();
    await inventoryPage.goBackToProducts();
    await inventoryPage.goToProductItemPage('Sauce Labs Fleece Jacket');
    await inventoryPage.addToCartButtonClick();
    await inventoryPage.goBackToProducts();
    await inventoryPage.goToProductItemPage('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addToCartButtonClick();
});

test('Check added and removed products on the cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToShoppingCart();
    //Expect to have 3 items in the cart
    await inventoryPage.checkTheItemsInCart();
    await inventoryPage.continueShoppingButtonClick();
    await inventoryPage.removeProductInventoryPage('Sauce Labs Onesie');
    await inventoryPage.goToShoppingCart();
    //Expect to have 2 items in the cart
    await inventoryPage.checkTheItemsInCart();
    await inventoryPage.continueShoppingButtonClick();
    await inventoryPage.removeProductInventoryPage('Sauce Labs Fleece Jacket');
    await inventoryPage.removeProductInventoryPage('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToShoppingCart();
    //Expect to have 0 item in the cart
    await inventoryPage.checkTheItemsInCart();

});

test('Cancel checkout process on the overview page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.goToShoppingCart();
    await inventoryPage.goToCheckoutProcess();
    await inventoryPage.fillInDataForCheckout('Monika', 'Test', '12345');
    await inventoryPage.continueCheckoutButtonClick();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await inventoryPage.cancelCheckoutButtonClick();

    await expect(inventoryPage.productsPageTitle).toBeVisible();
});

test('Proceed checkout process successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.goToShoppingCart();
    await inventoryPage.goToCheckoutProcess();
    await inventoryPage.fillInDataForCheckout('Monika', 'Test', '12345');
    await inventoryPage.continueCheckoutButtonClick();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await inventoryPage.finishCheckoutButtonClick();
    await expect(inventoryPage.completePageTitle).toBeVisible();
    await expect(inventoryPage.completePageHeader).toBeVisible();
})
