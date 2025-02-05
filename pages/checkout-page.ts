import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly shoppingCartBadge: Locator;
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
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
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