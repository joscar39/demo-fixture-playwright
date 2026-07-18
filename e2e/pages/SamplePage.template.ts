import { type Page, type Locator, expect } from '@playwright/test';

/**
 * PLANTILLA DE PAGE OBJECT.
 * Copia este archivo, renombralo (ej. LoglinPage.ts) y rellena.
 * Guia mental:
 *   1. Declara los locators que necesitas (private readonly).
 *   2. Inicializalos en el constructor con getByRole/getByLabel/getByTestId.
 *   3. Crea metodos de SERVICIO (acciones que la pagina ofrece).
 *   4. Crea metodos expectXxx (aserciones = oracle) DENTRO del POM.
 */
export class SamplePage{
  readonly page: Page;
  // 1) Locators (elige la estrategia mas estable disponible):
  private readonly someInput: Locator;
  private readonly submitButton: Locator;
  private readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;
    // 2) Prioridad de locators: getByRole > getByLabel > getByText > getByTestId > css
    this.someInput = page.getByLabel('Etiqueta del campo');
    this.submitButton = page.getByRole('button', { name: 'Enviar' });
    this.resultText = page.getByTestId('result');
  }

  // 3) Metodos de servicio (acciones):
  /** Arrange: navega a la pagina de login. */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** Servicio de negocio: iniciar sesion con credenciales dadas. */
  async something(value: string): Promise<void> {
    await this.someInput.fill(value);
    await this.submitButton.click();
  }

  // 4) Aserciones (oracle) dentro del POM:
  /** Oracle: verifica que se muestra un mensaje de error concreto. */
  async expectResult(expected: string): Promise<void> {
    await expect(this.resultText).toBeVisible();
    await expect(this.resultText).toContainText(expected);
  }
}
