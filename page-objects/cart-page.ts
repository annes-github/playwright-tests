import { Page, Locator } from "@playwright/test";
import { ItemListPage } from "./item-list-page";

export class CartPage extends ItemListPage {
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
        this.continueShoppingButton = this.page.getByRole("button", { name: "Continue Shopping" });
    }

}
