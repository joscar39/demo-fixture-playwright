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
test.describe('Modulo X', () => {
  test('Descripcion del caso @Smoke', async ({ page /*, samplePage */ }) => {
    // Arrange
    await page.goto('/');

    // Act
    // await samplePage.submit('valor');

    // Assert + evidencia
    await assertWithEvidence(page, 'Descripcion de lo que se valida', async () => {
      // await samplePage.expectResult('esperado');
    });
  });
});
