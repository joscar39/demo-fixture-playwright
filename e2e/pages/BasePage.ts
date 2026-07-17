import { type Page, expect } from '@playwright/test';

/**
 * Clase base opcional. Los Page Objects pueden heredar de ella
 * para reutilizar utilidades comunes (navegacion, titulo, url).
 * No es obligatoria, pero ahorra tiempo en la prueba.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navega a una ruta relativa al baseURL (ej. '/', '/login'). */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Verifica que la URL actual coincide con un patron. */
  async expectUrl(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }
}
