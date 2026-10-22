import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login-page";

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
});

test("Login with invalid credentials", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("invalid_user", "invalid_password");
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("Login with locked out user", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(page.getByText("Epic sadface: Sorry, this user has been locked out.")).toBeVisible();
});
