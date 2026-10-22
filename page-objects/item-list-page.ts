import { Page, Locator } from "@playwright/test";

export class ItemListPage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItems = this.page.locator("[data-test='inventory-item']");
        this.productName = this.productItems.locator(".inventory_item_name");
        this.productPrice = this.productItems.locator(".inventory_item_price");
        this.productDescription = this.productItems.locator(".inventory_item_desc");
        this.shoppingCartBadge = this.page.locator("[data-test='shopping-cart-badge']");
        this.shoppingCartLink = this.page.locator("[data-test='shopping-cart-link']");
    }

    getProductItemByName(productName: string): Locator {
        return this.productItems.filter({ hasText: productName });
    }

    getProductImageForProduct(productName: string): Locator {
        return this.productItems.getByAltText(productName, { exact: true });
    }

    getRemoveButtonForProduct(product: Locator): Locator {
        return product.getByRole("button", { name: "Remove" });
    }

    getNameForProduct(product: Locator): Locator {
        return product.locator(".inventory_item_name");
    }

    getDescriptionForProduct(product: Locator): Locator {
        return product.locator(".inventory_item_desc");
    }

    getPriceForProduct(product: Locator): Locator {
        return product.locator(".inventory_item_price");
    }

    getQuantityForProduct(product: Locator): Locator {
        return product.locator("[data-test='item-quantity']");
    }

}
