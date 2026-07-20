import {test as base, expect, Page} from '@playwright/test';

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

import {LoginPage} from "../pages/LoginPage";
import {CatalogPage} from "../pages/CatalogPage";
// import { SamplePage } from '../pages/SamplePage.template';

type Pages = {
    loginPage: LoginPage;
    catalogPage: CatalogPage;
    // // samplePage: SamplePage;
    // _placeholder?: never; // evita que el type quede vacio; borralo al anadir el primer POM
};

export const test = base.extend<Pages>({

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    catalogPage: async ({page}, use) => {
        await use(new CatalogPage(page));
    },
    // samplePage: async ({ page }, use) => {
    //   await use(new SamplePage(page));
    // },
});

export { expect };