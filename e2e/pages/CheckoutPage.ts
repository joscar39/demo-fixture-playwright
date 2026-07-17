import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly title: Locator;
    private readonly itemName: Locator;
    private readonly totalLabel: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.title = page.getByTestId('title');
        this.itemName = page.getByTestId('inventory-item-name');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.completeHeader = page.getByTestId('complete-header');
    }

    async fillInformation(first: string, last: string, zip: string): Promise<void> {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
        await this.continueButton.click();
    }

    async expectOverview(productName: string, expectedTotal: string): Promise<void> {
        await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
        await expect(this.title).toHaveText('Checkout: Overview');
        await expect(this.itemName).toHaveText(productName);
        await expect(this.totalLabel).toContainText(expectedTotal);
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async expectOrderComplete(): Promise<void> {
        await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}
