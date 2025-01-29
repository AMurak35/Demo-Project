import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly backToPtoductsButton: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('[data-test="shopping_cart_link"]');
        this.addToCartButton = page.locator('text="Add to cart"');
        this.removeFromCartButton = page.locator('button', { hasText: 'Remove' });
        this.backToPtoductsButton = page.locator('[data-test="back-to-products"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping_cart_badge"]');
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

    async goBackToProducts() {
        await this.backToPtoductsButton.click();
    }
}