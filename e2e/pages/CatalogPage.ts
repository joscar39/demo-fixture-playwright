import { type Page, type Locator, expect } from '@playwright/test';

/**
 * PAGE OBJECT: Catalogo y detalle de producto.
 * Cubre: abrir Catalog desde el menu lateral, abrir un producto,
 * seleccionar variante (talla/color) y agregar al carrito.
 * Locators identificados via arbol de accesibilidad (getByRole/getByLabel).
 */
export class CatalogPage {
    readonly page: Page;
    // 1) Locators (elige la estrategia mas estable disponible):
    private readonly catalogMenuLink: Locator;
    private readonly sizeSelect: Locator;
    private readonly colorSelect: Locator;
    private readonly addToCartButton: Locator;
    private readonly myCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // 2) Prioridad de locators: getByRole > getByLabel > getByText > getByTestId > css
        this.catalogMenuLink = page.getByRole('link', { name: 'Catalog' });
        this.sizeSelect = page.getByLabel('Size');
        this.colorSelect = page.getByLabel('Color');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.myCartLink = page.getByRole('link', { name: 'My Cart' });
    }

    // 3) Metodos de servicio (acciones):
    /** Servicio: abre el catalogo desde el menu lateral. */
    async openCatalog(): Promise<void> {
        await this.catalogMenuLink.click();
    }

    /** Servicio: abre el detalle de un producto por su nombre visible. */
    async openProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName }).click();
    }

    /** Servicio: selecciona la talla en el combobox "Size". */
    async selectSize(size: string): Promise<void> {
        await this.sizeSelect.selectOption(size);
    }

    /** Servicio: agrega el producto configurado al carrito. */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    // 4) Aserciones (oracle) dentro del POM:
    /** Oracle: verifica la redireccion al detalle del producto. */
    async expectProductDetail(productName: string): Promise<void> {
        await expect(this.page).toHaveURL(/\/products\//);
        await expect(this.page.getByRole('heading', { name: productName, level: 1 })).toBeVisible();
    }

    /** Oracle: verifica la variante seleccionada (talla y color). */
    async expectVariantSelected(size: string, color: string): Promise<void> {
        await expect(this.sizeSelect).toHaveValue(size);
        await expect(this.colorSelect).toHaveValue(color);
    }

    /** Oracle: verifica el contador del carrito en el header. */
    async expectCartCount(count: number): Promise<void> {
        await expect(this.myCartLink).toContainText(`(${count})`);
    }
}
