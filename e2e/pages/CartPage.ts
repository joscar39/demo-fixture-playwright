import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async expectItem(productName: string, expectedCount: number): Promise<void> {
        await expect(this.cartItems).toHaveCount(expectedCount);
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}