import { Page, Locator } from "@playwright/test";
import { ItemListPage } from "./item-list-page";

export class ProductPage extends ItemListPage {
    readonly filterDropDown: Locator;

    constructor(page: Page) {
        super(page);
        this.filterDropDown = this.page.getByRole('combobox');
    }

    getAddToCartButtonForProduct(product: Locator): Locator {
        return product.getByRole("button", { name: "Add to cart" });
    }


}
  