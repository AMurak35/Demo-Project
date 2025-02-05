import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productsPageTitle: Locator;
    readonly burgerMenu: Locator;
    readonly shoppingCart: Locator;
    readonly productSortContainer: Locator;
    readonly productItemLink: Locator;
    readonly productItemDescription: Locator;
    readonly productItemImage: Locator;
    readonly productItemPrice: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly shoppingCartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productsPageTitle = page.locator('[data-test="title"]');
        this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.productSortContainer = page.locator('.product_sort_container');
        this.productItemLink = page.locator('[data-test="inventory-item-name"]');
        this.productItemDescription = page.locator('.inventory_item_description');
        this.productItemImage = page.locator('.inventory_item_img');
        this.productItemPrice = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('text="Add to cart"')
        this.removeFromCartButton = page.locator('button', { hasText: 'Remove' });
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async addProductToCart(productName: string) {
        const product = this.productItemDescription.filter({ hasText: productName });
        const addToCartButton = product.getByText('Add to cart');

        let initialNumber = 0;
        // Check if the cart count element is visible
        if (await this.shoppingCartBadge.isVisible()) {
            const initialCount = await this.shoppingCartBadge.textContent();
            initialNumber = initialCount ? parseInt(initialCount) : 0;
        }

        await addToCartButton.click();

        await expect(this.shoppingCartBadge).toHaveText((initialNumber + 1).toString());
    }

    async removeProductInventoryPage(productName: string) {
        const product = this.productItemDescription.filter({ hasText: productName });
        const removeFromCartButton = product.locator('button', { hasText: 'Remove' });

        let initialNumber = 0;
        //Check if the cart count element is visible
        if (await this.shoppingCartBadge.isVisible()) {
            const initialCount = await this.shoppingCartBadge.textContent();
            initialNumber = initialCount ? parseInt(initialCount) : 0;
        }

        await removeFromCartButton.click();

        if (initialNumber > 1) {
            await expect(this.shoppingCartBadge).toHaveText((initialNumber - 1).toString());
        } else {
            await expect(this.shoppingCartBadge).not.toBeVisible();
        }
    }

    async goToProductItemPage(productName: string) {
        const product = this.productItemDescription.filter({ hasText: productName });
        const productItemLink = product.locator('[data-test="inventory-item-name"]');
        await productItemLink.click();
    }

    async addToCartButtonClick() {
        let initialNumber = 0;
        // Check if the cart count element is visible
        if (await this.shoppingCartBadge.isVisible()) {
            const initialCount = await this.shoppingCartBadge.textContent();
            initialNumber = initialCount ? parseInt(initialCount) : 0;
        }

        await this.addToCartButton.click();

        await expect(this.shoppingCartBadge).toHaveText((initialNumber + 1).toString());

    }

    async removeFromCartButtonClick() {
        let initialNumber = 0;

        if (await this.shoppingCartBadge.isVisible()) {
            const initialCount = await this.shoppingCartBadge.textContent();
            initialNumber = initialCount ? parseInt(initialCount) : 0;
        }

        await this.removeFromCartButton.click();

        if (initialNumber > 1) {
            await expect(this.shoppingCartBadge).toHaveText((initialNumber - 1).toString());
        } else {
            await expect(this.shoppingCartBadge).not.toBeVisible();
        }
    }

    async goToShoppingCart() {
        await this.shoppingCart.click();
    }
}