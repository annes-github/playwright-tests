import { test, expect } from "@playwright/test";
import { CheckoutInfoPage } from "../page-objects/checkout-info-page";  

let checkoutInfoPage: CheckoutInfoPage;

test.beforeEach( async({page}) => {
    await page.goto("/checkout-step-one.html");
    checkoutInfoPage = new CheckoutInfoPage(page);

});

test("Submit of valid information", async({page}) => {
    await checkoutInfoPage.fillCheckoutInfo("Joe", "Tester", "94110");
    await checkoutInfoPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two/);
});

test("Error message is displayed when first name is blank", async() =>{
    await checkoutInfoPage.lastNameInput.fill("Tester");
    await checkoutInfoPage.zipCodeInput.fill("94110");
    await checkoutInfoPage.continueButton.click();
    await expect(checkoutInfoPage.alert).toHaveText("Error: First Name is required");
});

test("Error message is displayed when last name is blank", async() => {
    await checkoutInfoPage.firstNameInput.fill("Joe");
    await checkoutInfoPage.zipCodeInput.fill("94110");
    await checkoutInfoPage.continueButton.click();
    await expect(checkoutInfoPage.alert).toHaveText("Error: Last Name is required");
});

test("Error message is displayed when zip code is blank", async() => {
    await checkoutInfoPage.firstNameInput.fill("Joe");
    await checkoutInfoPage.lastNameInput.fill("Tester");
    await checkoutInfoPage.continueButton.click();
    await expect(checkoutInfoPage.alert).toHaveText('Error: Postal Code is required');
});