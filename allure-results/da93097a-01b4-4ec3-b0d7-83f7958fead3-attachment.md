# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: add-to-cart.spec.ts >> Flujo de catalogo y carrito >> Agregar Black heels talla M al carrito @Smoke @Catalog
- Location: e2e\specs\add-to-cart.spec.ts:5:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Account Details and Order History' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Account Details and Order History' })

```

```yaml
- banner:
  - search:
    - button "Submit"
    - textbox "Search"
  - navigation:
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
    - link "Log In":
      - /url: /account/login
    - link "Sign up":
      - /url: /account/register
  - link "My Cart (0)":
    - /url: "#"
  - link "Check Out":
    - /url: /cart
  - heading "Sauce Demo" [level=1]:
    - link "Sauce Demo":
      - /url: /
      - img "Sauce Demo"
  - heading "Just a demo site showing off what Sauce can do." [level=3]
- navigation:
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Catalog":
        - /url: /collections/all
    - listitem:
      - link "Blog":
        - /url: /blogs/news
    - listitem:
      - link "About Us":
        - /url: /pages/about-us
    - listitem:
      - link "Wish list":
        - /url: "#sauce-show-wish-list"
    - listitem:
      - link "Refer a friend":
        - /url: "#sauce-show-refer-friend"
  - link:
    - /url: http://www.facebook.com/shopify
  - link:
    - /url: http://www.twitter.com/sauce_io
  - link:
    - /url: http://www.instagram.com/shopify
  - link:
    - /url: http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/
  - link:
    - /url: /blogs/news.atom
- link "Home":
  - /url: /
- text: —
- link "Login":
  - /url: /account/login
- heading "Customer Login" [level=1]
- text: Email Address
- textbox "Email Address": joscar@yopmail.com
- text: Password
- textbox "Password": Aa123456.
- paragraph:
  - link "Forgot your password?":
    - /url: "#"
- button "Sign In"
- contentinfo:
  - navigation:
    - heading "Footer" [level=2]
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
  - heading "About Us" [level=2]
  - paragraph:
    - strong:
      - text: This is a demo site created for
      - link "Sauce":
        - /url: http://sauceapp.io
    - text: ", an awesome new way to make your Shopify site social. Sauce allows you to let customers to share what they purchase to their friends, and see what their friends have purchased or \"wanted\" on your store."
  - img "We accept Amex"
  - img "We accept Visa"
  - img "We accept Mastercard"
  - text: Copyright © 2026 Sauce Demo.
  - link "Shopping Cart by Shopify":
    - /url: https://www.shopify.co.uk/tour/shopping-cart?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore
  - text: .
  - navigation:
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
- img "Protected by hCaptcha"
- text: Protected by hCaptcha
- list:
  - listitem:
    - link "Privacy":
      - /url: https://hcaptcha.com/privacy
  - listitem:
    - text: ·
    - link "Terms":
      - /url: https://hcaptcha.com/terms
```

# Test source

```ts
  1  | import { type Page, type Locator, expect } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * PLANTILLA DE PAGE OBJECT.
  5  |  * Copia este archivo, renombralo (ej. LoglinPage.ts) y rellena.
  6  |  * Guia mental:
  7  |  *   1. Declara los locators que necesitas (private readonly).
  8  |  *   2. Inicializalos en el constructor con getByRole/getByLabel/getByTestId.
  9  |  *   3. Crea metodos de SERVICIO (acciones que la pagina ofrece).
  10 |  *   4. Crea metodos expectXxx (aserciones = oracle) DENTRO del POM.
  11 |  */
  12 | export class LoginPage{
  13 |     readonly page: Page;
  14 |     // 1) Locators (elige la estrategia mas estable disponible):
  15 |     private readonly userInput: Locator;
  16 |     private readonly passwordInput: Locator;
  17 |     private readonly logInButton: Locator;
  18 |     private readonly signInButton: Locator;
  19 |     private readonly resultText: Locator;
  20 | 
  21 |     constructor(page: Page) {
  22 |         this.page = page;
  23 |         // 2) Prioridad de locators: getByRole > getByLabel > getByText > getByTestId > css
  24 |         this.userInput = page.getByRole('textbox', { name: 'Email Address' });
  25 |         this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  26 |         this.logInButton = page.getByRole('link', { name: 'Log In' });
  27 |         this.signInButton = page.getByRole('button', { name: 'Sign In' });
  28 |         this.resultText = page.getByRole('heading', { name: 'Account Details and Order History' });
  29 |     }
  30 | 
  31 |     // 3) Metodos de servicio (acciones):
  32 |     /** Arrange: navega a la pagina de login. */
  33 |     async goto(): Promise<void> {
  34 |         await this.page.goto('/');
  35 |     }
  36 | 
  37 |     /** Servicio de negocio: iniciar sesion con credenciales dadas. */
  38 |     async login(user: string, pass: string): Promise<void> {
  39 |         await this.logInButton.click();
  40 |         await this.userInput.fill(user);
  41 |         await this.passwordInput.fill(pass);
  42 |         await this.signInButton.click();
  43 |     }
  44 | 
  45 |     // 4) Aserciones (oracle) dentro del POM:
  46 |     /** Oracle: verifica que se muestra un mensaje de error concreto. */
  47 |     async expectResult(expected: string): Promise<void> {
> 48 |         await expect(this.resultText).toBeVisible();
     |                                       ^ Error: expect(locator).toBeVisible() failed
  49 |         await expect(this.resultText).toContainText(expected);
  50 |     }
  51 | }
  52 | 
```