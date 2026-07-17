import { defineConfig, devices } from '@playwright/test';
import os from 'node:os';

/**
 * ================================================================
 *  CONFIG AGNOSTICA - lo unico que cambia entre apps esta AQUI.
 *  Al empezar la prueba, ajusta 1) baseURL y 2) testIdAttribute.
 * ================================================================
 */
export default defineConfig({
  testDir: './e2e/specs',
  // No ejecutar plantillas ni material de referencia:
  testIgnore: ['**/_reference/**', '**/*.template.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['line'],
    ['allure-playwright', {
      resultsDir: 'allure-results',
      detail: true,
      environmentInfo: { OS: os.platform(), Node: process.version },
    }],
  ],

  use: {
    // 1) CAMBIA ESTO por la URL de la app que te den.
    //    Puedes sobreescribir sin tocar codigo: BASE_URL=... npx playwright test
    baseURL: 'https://www.saucedemo.com',

    // 2) Ajusta al atributo real del sitio. Los mas comunes:
    //    'data-test' (SauceDemo) | 'data-testid' (React estandar) | 'data-qa'
    //    Si el sitio NO usa data-*, ignora getByTestId y usa getByRole/getByLabel.
    testIdAttribute: 'data-test',

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Descomenta si te piden cross-browser:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});