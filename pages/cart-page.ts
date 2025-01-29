import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartPageTitle: Locator;
    readonly burgerMenu: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItemsOnCartPage: Locator;
    readonly checkoutButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly shoppingCart: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartPageTitle = page.locator('[data-test="title', { hasText: 'Your Cart' });
        this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItemsOnCartPage = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeFromCartButton = page.locator('button', { hasText: 'Remove' });
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping_cart_badge"]');
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

    async checkTheItemsInCart() {
        let itemNumber = 0;
        if (await this.shoppingCartBadge.isVisible()) {
            const cartNumber = await this.shoppingCartBadge.textContent();
            itemNumber = cartNumber ? parseInt(cartNumber) : 0;
        }
        const ItemsOnCartPage = await this.cartItemsOnCartPage.count();
        if (itemNumber >= 1) {
            expect(ItemsOnCartPage).toEqual(itemNumber);
        } else {
            await expect(this.cartItemsOnCartPage).not.toBeVisible();
        }
    }

    async continueShoppingButtonClick() {
        await this.continueShoppingButton.click();
    }

    async goToCheckoutProcess() {
        await this.checkoutButton.click();
    }
}