import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test('Cancel checkout process on the overview page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.goToShoppingCart();
    await cartPage.goToCheckoutProcess();
    await checkoutPage.fillInDataForCheckout('Monika', 'Test', '12345');
    await checkoutPage.continueCheckoutButtonClick();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await checkoutPage.cancelCheckoutButtonClick();

    await expect(inventoryPage.productsPageTitle).toBeVisible();
});

test('Proceed checkout process successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.goToShoppingCart();
    await cartPage.goToCheckoutProcess();
    await checkoutPage.fillInDataForCheckout('Monika', 'Test', '12345');
    await checkoutPage.continueCheckoutButtonClick();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await checkoutPage.finishCheckoutButtonClick();
    await expect(checkoutPage.completePageTitle).toBeVisible();
    await expect(checkoutPage.completePageHeader).toBeVisible();
})