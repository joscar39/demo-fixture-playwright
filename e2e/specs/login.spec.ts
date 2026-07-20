import { test } from '../fixtures/test';
import { assertWithEvidence } from '../utils/evidence';

/**
 * PLANTILLA DE SPEC.  Copia, renombra (ej. login.spec.ts) y rellena.
 * Patron: Arrange (preparar) -> Act (actuar) -> Assert (verificar).
 *
 * Recuerda:
 *   - Pide las fixtures que necesites entre { } (page, tus POM...).
 *   - Usa tags @Smoke @Modulo para poder filtrar.
 *   - Envuelve las validaciones importantes en assertWithEvidence.
 */
test.describe('FLujo de autenticacion', () => {
    test('Login éxitos con credenciales dadas @Smoke @auth', async ({ page, loginPage }) => {
        // Arrange
        await loginPage.goto();

        // Act
        await loginPage.login("joscar@yopmail.com", "Aa123456.");

        // Assert + evidencia
        await assertWithEvidence(page, 'Se esta verficando pantalla login', async () => {
            await loginPage.expectResult('Account');
        });
    });
});
