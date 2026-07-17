import { test as base, expect } from '@playwright/test';

/**
 * FIXTURES: aqui inyectas los Page Objects que crees durante la prueba.
 *
 * COMO AGREGAR UN POM (3 pasos):
 *   1. import { MiPage } from '../pages/MiPage';
 *   2. anade  miPage: MiPage;  al type Pages
 *   3. anade el bloque de la fixture en base.extend
 *
 * Ejemplo listo para descomentar:
 */

// import { SamplePage } from '../pages/SamplePage.template';

type Pages = {
    // samplePage: SamplePage;
    _placeholder?: never; // evita que el type quede vacio; borralo al anadir el primer POM
};

export const test = base.extend<Pages>({
    // samplePage: async ({ page }, use) => {
    //   await use(new SamplePage(page));
    // },
});

export { expect };