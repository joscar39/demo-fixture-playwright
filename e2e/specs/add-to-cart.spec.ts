import { test } from '../fixtures/test';
import { assertWithEvidence } from '../utils/evidence';

test.describe('Flujo de catalogo y carrito', () => {
    test('Agregar Black heels talla M al carrito @Smoke @Catalog', async ({ page, loginPage, catalogPage }) => {
        // Arrange: sesion iniciada
        await loginPage.goto();
        await loginPage.login('joscar@yopmail.com', 'Aa123456.');
        await loginPage.expectResult('Account');

        // Act: navegar al catalogo y abrir el producto
        await catalogPage.openCatalog();
        await catalogPage.openProduct('Black heels');

        // Assert + evidencia: redireccion al detalle
        await assertWithEvidence(page, 'Se muestra el detalle del producto Black heels', async () => {
            await catalogPage.expectProductDetail('Black heels');
        });

        // Act: talla M, color queda en Red (unica opcion), agregar al carrito
        await catalogPage.selectSize('M');
        await catalogPage.expectVariantSelected('M', 'Red');
        await catalogPage.addToCart();

        // Assert + evidencia: el carrito refleja 1 item
        await assertWithEvidence(page, 'El carrito muestra 1 producto agregado', async () => {
            await catalogPage.expectCartCount(1);
        });
    });
});
