import { test } from '../fixtures/test';

test.describe('Carrito de compras', () => {
    const PRODUCTO = 'Sauce Labs Backpack';

    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.expectLoaded();
    });

    test('Anadir un producto refleja la cantidad en el carrito @Smoke @Cart', async ({
                                                                                         inventoryPage,
                                                                                         cartPage,
                                                                                     }) => {
        // Act
        await inventoryPage.addProductToCart(PRODUCTO);
        // Assert (inventario)
        await inventoryPage.expectCartCount(1);
        // Act
        await inventoryPage.openCart();
        // Assert (carrito)
        await cartPage.expectItem(PRODUCTO, 1);
    });
});