import { When } from '@cucumber/cucumber';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

When('the user goes to the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.goToShoppingCart();
});
