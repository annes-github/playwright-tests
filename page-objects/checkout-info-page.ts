import { Page, Locator } from "@playwright/test";

export class CheckoutInfoPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly alert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator("[data-test='firstName']");
        this.lastNameInput = this.page.locator("[data-test='lastName']");
        this.zipCodeInput = this.page.locator("[data-test='postalCode']");
        this.continueButton = this.page.getByRole("button", { name: "Continue" });
        this.alert = this.page.getByRole("alert");
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(postalCode);
    }

}
