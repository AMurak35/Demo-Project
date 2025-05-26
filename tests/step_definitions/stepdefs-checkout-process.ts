import { Given } from '@cucumber/cucumber';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

Given('the user adds the product {string} to the cart', async function (this: CustomWorld, productName: string) {
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
  await inventoryPage.goto();
  await inventoryPage.addProductToCart(productName);
});
