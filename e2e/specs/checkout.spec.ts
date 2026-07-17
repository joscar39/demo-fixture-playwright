import { test } from '../fixtures/test';
import { assertWithEvidence } from '../utils/evidence';

test.describe('Checkout', () => {
    const PRODUCTO = 'Sauce Labs Backpack';
    const TOTAL = '$32.39';

    test('Compra completa de un producto @Smoke @Checkout', async ({
                                                                       page,
                                                                       loginPage,
                                                                       inventoryPage,
                                                                       cartPage,
                                                                       checkoutPage,
                                                                   }) => {
        // Arrange
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.expectLoaded();
        await inventoryPage.addProductToCart(PRODUCTO);
        await inventoryPage.openCart();
        await cartPage.expectItem(PRODUCTO, 1);

        // Act
        await cartPage.checkout();
        await checkoutPage.fillInformation('Joscar', 'Sosa', '10001');

        // Assert + evidencia (overview)
        await assertWithEvidence(page, 'Overview muestra producto y total correctos', async () => {
            await checkoutPage.expectOverview(PRODUCTO, TOTAL);
        });

        // Act
        await checkoutPage.finish();

        // Assert + evidencia (confirmacion)
        await assertWithEvidence(page, 'Orden completada con mensaje de confirmacion', async () => {
            await checkoutPage.expectOrderComplete();
        });
    });
});
