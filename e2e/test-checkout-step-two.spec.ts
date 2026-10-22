import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-objects/product-page";
import { CartPage } from "../page-objects/cart-page";
import { CheckoutInfoPage } from "../page-objects/checkout-info-page";
import { CheckoutOverviewPage } from "../page-objects/checkout-overview-page";
import { productData } from "../data/product-list.json";

let checkoutOverviewPage: CheckoutOverviewPage;
const productsToBuy = [productData[0], productData[1],];


test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
    const productPage = new ProductPage(page);
    for (const product of productsToBuy) {
        await productPage.getAddToCartButtonForProduct(productPage.getProductItemByName(product.name)).click();
    }
    await productPage.shoppingCartLink.click();

    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();

    const checkoutInfoPage = new CheckoutInfoPage(page);
    await checkoutInfoPage.fillCheckoutInfo("Test", "User", "12345");
    await checkoutInfoPage.continueButton.click();
    await page.waitForURL(/checkout-step-two/);

    checkoutOverviewPage = new CheckoutOverviewPage(page);
});

test("Checkout overview shows the product name, description and price", async() => {

    for (const productToBuy of productsToBuy){
        const product = checkoutOverviewPage.getProductItemByName(productToBuy.name);
        await expect(checkoutOverviewPage.getNameForProduct(product)).toBeVisible();
        await expect(checkoutOverviewPage.getNameForProduct(product)).toHaveText(productToBuy.name);
        await expect(checkoutOverviewPage.getDescriptionForProduct(product)).toBeVisible();
        await expect(checkoutOverviewPage.getDescriptionForProduct(product)).toHaveText(productToBuy.description);
        await expect(checkoutOverviewPage.getPriceForProduct(product)).toBeVisible();
        await expect(checkoutOverviewPage.getPriceForProduct(product)).toHaveText(productToBuy.price);
        await expect(checkoutOverviewPage.getQuantityForProduct(product)).toBeVisible();
        await expect(checkoutOverviewPage.getQuantityForProduct(product)).toHaveText("1");
    }

});

test("Checkout overview shows the payment information", async() => {
    await expect(checkoutOverviewPage.paymentInformationLabel).toBeVisible();
    await expect(checkoutOverviewPage.cardText).toHaveText("SauceCard #31337");
});


test("Checkout overview shows the shipping information", async() => {
    await expect(checkoutOverviewPage.shippingInformationLabel).toBeVisible();
    await expect(checkoutOverviewPage.shippingText).toHaveText("Free Pony Express Delivery!");
});


test("Checkout overview shows the Price Total", async() => {
    const productTotal = Number((await checkoutOverviewPage.calculateProductTotal(productsToBuy)).toFixed(2));
    const salesTax = Number((productTotal * 0.08).toFixed(2));
    await expect(checkoutOverviewPage.priceTotalLabel).toBeVisible();
    await expect(checkoutOverviewPage.itemTotalText).toHaveText(`Item total: $${productTotal.toFixed(2)}`);
    await expect(checkoutOverviewPage.taxText).toHaveText(`Tax: $${salesTax.toFixed(2)}`);
    await expect(checkoutOverviewPage.totalText).toHaveText(`Total: $${(productTotal + salesTax).toFixed(2)}`);
    
});

test("Cancel button returns the user to the product page", async({page}) => {
    await checkoutOverviewPage.cancelButton.click();
    await expect(page).toHaveURL(/inventory/);

});

test("Finish button navigates user to the checkout success page", async({page}) =>{
    await checkoutOverviewPage.finishButton.click();
    await expect(page).toHaveURL(/checkout-complete/);
});