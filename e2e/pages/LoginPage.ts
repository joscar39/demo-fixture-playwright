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
export class LoginPage{
    readonly page: Page;
    // 1) Locators (elige la estrategia mas estable disponible):
    private readonly userInput: Locator;
    private readonly passwordInput: Locator;
    private readonly logInButton: Locator;
    private readonly signInButton: Locator;
    private readonly resultText: Locator;

    constructor(page: Page) {
        this.page = page;
        // 2) Prioridad de locators: getByRole > getByLabel > getByText > getByTestId > css
        this.userInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.logInButton = page.getByRole('link', { name: 'Log In' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.resultText = page.getByRole('heading', { name: 'Account Details and Order History' });
    }

    // 3) Metodos de servicio (acciones):
    /** Arrange: navega a la pagina de login. */
    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    /** Servicio de negocio: iniciar sesion con credenciales dadas. */
    async login(user: string, pass: string): Promise<void> {
        await this.logInButton.click();
        await this.userInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.signInButton.click();
    }

    // 4) Aserciones (oracle) dentro del POM:
    /** Oracle: verifica que se muestra un mensaje de error concreto. */
    async expectResult(expected: string): Promise<void> {
        await expect(this.resultText).toBeVisible();
        await expect(this.resultText).toContainText(expected);
    }
}
