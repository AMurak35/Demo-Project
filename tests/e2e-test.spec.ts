import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

test('E2E-Test | Successfull check out', async ({ page, context }) => {
    await context.clearCookies();
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    //Start on the login page
    await loginPage.goto();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();
    //Check the page title
    await expect(inventoryPage.productsPageTitle).toBeVisible();
    //Add products to the cart
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.goToProductItemPage('Sauce Labs Onesie');
    await inventoryPage.addToCartButtonClick();
    await inventoryPage.goBackToProducts();
    //Remove product from the cart
    await inventoryPage.removeProductInventoryPage('Sauce Labs Bike Light');
    //Check the products in the cart
    await inventoryPage.goToShoppingCart();
    await inventoryPage.checkTheItemsInCart();
    //Start the checkout process
    await inventoryPage.goToCheckoutProcess();
    await inventoryPage.fillInDataForCheckout('Monika', 'Test', '12345');
    await inventoryPage.continueCheckoutButtonClick();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    //Finish the checkout process
    await inventoryPage.finishCheckoutButtonClick();
    await expect(inventoryPage.completePageTitle).toBeVisible();
    await expect(inventoryPage.completePageHeader).toBeVisible();
})