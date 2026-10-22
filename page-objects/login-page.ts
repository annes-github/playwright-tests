import { Page, Locator } from "@playwright/test";


export class LoginPage {
   
    readonly page: Page;
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameTextbox = this.page.getByRole("textbox", { name: "Username" });
        this.passwordTextbox = this.page.getByRole("textbox", { name: "Password" });
        this.loginButton = this.page.getByRole("button", {name: "Login"});
    }

    async login(username: string, password: string) {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
}