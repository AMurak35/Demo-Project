import { When } from '@cucumber/cucumber';
import { InventoryPage } from '../../pages/inventory-page';
import { ProductPage } from '../../pages/product-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let productPage: ProductPage;

When('the user opens the product page for {string}', async function (this: CustomWorld, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  productPage = new ProductPage(this.page);
  await inventoryPage.goToProductItemPage(productName);
});

When('the user adds the product to the cart', async function () {
  await productPage.addToCartButtonClick();
});

When('the user removes the product from the cart', async function () {
  await productPage.removeFromCartButtonClick();
});

When('the user navigates back to the inventory page', async function () {
  await productPage.goBackToProducts();
});
