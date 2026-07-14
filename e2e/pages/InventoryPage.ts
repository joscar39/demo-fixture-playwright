import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    private readonly title: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByText('Products');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/.*inventory\.html/);
        await expect(this.title).toBeVisible();
    }

    async addProductToCart(productName: string): Promise<void> {
        const slug = productName.toLowerCase().replace(/\s+/g, '-');
        await this.page.getByTestId(`add-to-cart-${slug}`).click();
    }

    async expectCartCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}