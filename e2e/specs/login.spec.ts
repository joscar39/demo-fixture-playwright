import { test } from '../fixtures/test';
import { assertWithEvidence } from '../utils/evidence';

test.describe('Autenticacion', () => {
    test('Login exitoso con usuario estandar @Smoke @Auth', async ({
                                                                       page,
                                                                       loginPage,
                                                                       inventoryPage,
                                                                   }) => {
        // Arrange
        await loginPage.goto();

        // Act
        await loginPage.login('standard_user', 'secret_sauce');

        // Assert + evidencia
        await assertWithEvidence(page, 'Inventario cargado tras login exitoso', async () => {
            await inventoryPage.expectLoaded();
        });
    });
});