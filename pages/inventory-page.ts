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
    //Locators on the product item page
    readonly backToPtoductsButton: Locator;
    //Locators on the cart page
    readonly continueShoppingButton: Locator;
    readonly cartItemsOnCartPage: Locator;
    readonly checkoutButton: Locator;
    //Locators on the page "Checkout: Your Information"
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueCheckoutButton: Locator;
    readonly cancelCheckoutButton: Locator;
    //Locators on the page "Checkout:Overview"
    readonly finishCheckoutButton: Locator;
    //Locators on the page "Checkout:Complete!"
    readonly completePageTitle: Locator;
    readonly completePageHeader: Locator;
    readonly completePageBackButton: Locator;

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
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.backToPtoductsButton = page.locator('[data-test="back-to-products"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItemsOnCartPage = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueCheckoutButton = page.locator('[data-test="continue"]');
        this.cancelCheckoutButton = page.locator('[data-test="cancel"]');
        this.finishCheckoutButton = page.locator('[data-test="finish"]');
        this.completePageTitle = page.locator('[data-test="title"]', { hasText: 'Checkout: Complete!' });
        this.completePageHeader = page.locator('[data-test="complete-header"]');
        this.completePageBackButton = page.locator('[data-test="back-to-products"]');
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

    async goToCart() {
        await this.shoppingCart.click();
    }

    async goBackToProducts() {
        await this.backToPtoductsButton.click();
    }

    async goToShoppingCart() {
        await this.shoppingCart.click();
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

    async fillInDataForCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continueCheckoutButtonClick() {
        await this.continueCheckoutButton.click();
    }

    async cancelCheckoutButtonClick() {
        await this.cancelCheckoutButton.click();
    }

    async finishCheckoutButtonClick() {
        await this.finishCheckoutButton.click();
    }
}