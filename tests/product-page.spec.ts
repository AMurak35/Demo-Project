import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { ProductPage } from '../pages/product-page';

test('Add products to and remove them from cart on the product item page', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);
  await inventoryPage.goto();
  await inventoryPage.goToProductItemPage('Sauce Labs Backpack');
  await productPage.addToCartButtonClick();
  await productPage.removeFromCartButtonClick();
  await productPage.goBackToProducts();
  await inventoryPage.goToProductItemPage('Sauce Labs Fleece Jacket');
  await productPage.addToCartButtonClick();
  await productPage.goBackToProducts();

  await inventoryPage.goToProductItemPage('Sauce Labs Bolt T-Shirt');
  await productPage.addToCartButtonClick();
});
