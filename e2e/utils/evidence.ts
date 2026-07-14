import { type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * Ejecuta una asercion y, SOLO si pasa, captura y adjunta un screenshot
 * a Allure dentro de un step nombrado.
 * Si la asercion falla, lanza la excepcion ANTES del screenshot, por lo
 * que el screenshot positivo nunca se toma en un fallo (elegante):
 * ese caso ya lo cubre 'screenshot: only-on-failure' de la config.
 */
export async function assertWithEvidence(
    page: Page,
    stepName: string,
    assertion: () => Promise<void>,
): Promise<void> {
    await allure.step(stepName, async () => {
        await assertion();                                   // si falla, corta aqui
        const shot = await page.screenshot({ fullPage: true });
        await allure.attachment(stepName, shot, 'image/png');
    });
}