import { test } from '../fixtures/test';
import { assertWithEvidence } from '../utils/evidence';

const casosInvalidos = [
    { caso: 'usuario bloqueado', user: 'locked_out_user', pass: 'secret_sauce', error: 'locked out' },
    { caso: 'password incorrecto', user: 'standard_user', pass: 'wrong', error: 'do not match' },
    { caso: 'campos vacios', user: '', pass: '', error: 'Username is required' },
];

test.describe('Autenticacion negativa', () => {
    for (const c of casosInvalidos) {
        test(`Login rechazado: ${c.caso} @Auth @DataDriven`, async ({ page, loginPage }) => {
            // Arrange
            await loginPage.goto();

            // Act
            await loginPage.login(c.user, c.pass);

            // Assert + evidencia del error mostrado
            await assertWithEvidence(page, `Error mostrado: ${c.caso}`, async () => {
                await loginPage.expectError(c.error);
            });
        });
    }
});