import {Page, Locator} from  "@playwright/test";
import { ItemListPage } from "./item-list-page";
import { priceToNumber } from "../e2e/helpers";

export class CheckoutOverviewPage extends ItemListPage {
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly paymentInformationLabel: Locator;
    readonly cardText: Locator;
    readonly shippingInformationLabel: Locator;
    readonly shippingText: Locator;
    readonly priceTotalLabel: Locator;
    readonly itemTotalText: Locator;
    readonly taxText: Locator;
    readonly totalText: Locator;
    

    constructor(page: Page) {
        super(page);
        this.finishButton = page.getByRole("button", {name:"Finish"});
        this.cancelButton = page.getByRole("button", {name: "Cancel"});
        this.paymentInformationLabel = page.getByText("Payment Information:");
        this.cardText = page.locator("[data-test='payment-info-value']");
        this.shippingInformationLabel = page.getByText("Shipping Information:");
        this.shippingText = page.locator("[data-test='shipping-info-value']");
        this.priceTotalLabel = page.getByText("Price Total");
        this.itemTotalText = page.locator("[data-test='subtotal-label']");
        this.taxText = page.locator("[data-test='tax-label']");
        this.totalText = page.locator("[data-test='total-label']");

    }


    async calculateProductTotal(products: { name: string}[]): Promise<number> {
        let total = 0;
        for (const product of products) {
            const productItem = this.getProductItemByName(product.name);
            const price = await this.getPriceForProduct(productItem).textContent();
            total += priceToNumber(price ?? "");
        }

        return total;

    }


}


