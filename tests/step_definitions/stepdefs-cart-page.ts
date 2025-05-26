import { Given, When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { CustomWorld } from './world';

let inventoryPage: InventoryPage;
let cartPage: CartPage;

Given('the user is on the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  await cartPage.goTo();
});

When('the user goes to the inventory page', async function (this: CustomWorld) {
  await inventoryPage.goto();
});

When('the user adds {string} to the cart', async function (this: CustomWorld, productName: string) {
  await inventoryPage.addProductToCart(productName);
});

When('the user removes {string} from the inventory page', async function (this: CustomWorld, productName: string) {
  await inventoryPage.removeProductInventoryPage(productName);
});

When('the user clicks the continue shopping button', async function (this: CustomWorld) {
  await cartPage.continueShoppingButtonClick();
});
