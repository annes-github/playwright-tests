import { test, expect } from "@playwright/test";
import { CartPage } from "../page-objects/cart-page";
import { ProductPage } from "../page-objects/product-page"; 
import { productData } from "../data/product-list.json";



let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
    const productPage = new ProductPage(page);
    await productPage.getAddToCartButtonForProduct(productPage.getProductItemByName(productData[0].name)).click();
    await page.goto("/cart.html");
    cartPage = new CartPage(page);
});


test("Remove button removes the item from the cart", async() => {
    await cartPage.getRemoveButtonForProduct(cartPage.getProductItemByName(productData[0].name)).click();
    await expect(cartPage.productItems).toHaveCount(0);
});

test("Continue Shopping button returns user to the product page", async({page}) => {
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL(/inventory/);

});

test("Checkout button navigates the user to the checkout step 1 page", async({page}) => {
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL(/checkout-step-one/);

});
