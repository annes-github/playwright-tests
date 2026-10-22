import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-objects/product-page";
import { sortProductsByPrice } from "./helpers";
import { productData } from "../data/product-list.json";
import { CartPage } from "../page-objects/cart-page";

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
    productPage = new ProductPage(page);
});

test("Product page content is sorted alphabetically A-Z by default", async () => {
    await expect(productPage.filterDropDown).toHaveValue("az");
    const expectedNames = productData.map(p => p.name).sort();
    await expect(productPage.productName).toHaveText(expectedNames);
    
});

test("Product page content is sorted alphabetically Z-A", async () => {
    await productPage.filterDropDown.selectOption('Name (Z to A)');
    await expect(productPage.filterDropDown).toHaveValue("za");
    const expectedNames = productData.map(p => p.name).sort().reverse();
    await expect(productPage.productName).toHaveText(expectedNames);
  
});

test("Product page content is sorted by price low to high", async () => {
    await productPage.filterDropDown.selectOption('Price (low to high)');
    await expect(productPage.filterDropDown).toHaveValue("lohi");
    const expectedPrices = sortProductsByPrice(productData.map(p => p.price), "ascending");
    await expect(productPage.productPrice).toHaveText(expectedPrices);

});

test("Product page content is sorted by price high to low", async () => {
    await productPage.filterDropDown.selectOption('Price (high to low)');
    await expect(productPage.filterDropDown).toHaveValue("hilo");
    const expectedPrices = sortProductsByPrice(productData.map(p => p.price), "descending");
    await expect(productPage.productPrice).toHaveText(expectedPrices);;

});


test("Product page contains all product names", async() => {
    await expect(productPage.productName).toHaveText(productData.map(p => p.name));
});


test("Product page contains all product prices", async() => {
    await expect(productPage.productPrice).toHaveText(productData.map(p => p.price));
});


test("Product page contains all product descriptions", async() => {
    await expect(productPage.productDescription).toHaveText(productData.map(p => p.description));
});


test("Each product on the products page has an 'Add to cart' button", async() => {
    await expect(productPage.productItems).toHaveCount(productData.length);
    const products = await productPage.productItems.all();
    for (const product of products) {
        await expect(productPage.getAddToCartButtonForProduct(product)).toBeVisible();
        await expect(productPage.getAddToCartButtonForProduct(product)).toBeEnabled();
    }
});


test("Each product on the product page has an image", async() => {
    for (const product of productData) {
        await expect(productPage.getProductImageForProduct(product.name)).toBeVisible();
    }
});

test("Product can be added to the cart", async({page}) =>{
    const productToAdd = productPage.getProductItemByName(productData[0].name);
    await (productPage.getAddToCartButtonForProduct(productToAdd)).click();
    await expect(productPage.shoppingCartBadge).toHaveText('1');
    await productPage.shoppingCartLink.click();
    await expect(page).toHaveURL(/cart/);
    const cartPage = new CartPage(page);
    const productInCart = cartPage.getProductItemByName(productData[0].name);
    await expect(productInCart).toBeVisible();
    await expect(cartPage.getQuantityForProduct(productInCart)).toHaveText('1');
});

test("Products can be removed from the cart", async({page}) =>{
    const firstProductToRemove = productPage.getProductItemByName(productData[1].name);
    const secondProductToRemove = productPage.getProductItemByName(productData[2].name);
    await productPage.getAddToCartButtonForProduct(firstProductToRemove).click();
    await productPage.getAddToCartButtonForProduct(secondProductToRemove).click();
    await expect(productPage.shoppingCartBadge).toHaveText('2');
    await productPage.getRemoveButtonForProduct(firstProductToRemove).click();
    await expect(productPage.shoppingCartBadge).toHaveText('1');
    await productPage.getRemoveButtonForProduct(secondProductToRemove).click();
    await expect(productPage.shoppingCartBadge).toBeHidden();
    const cartPage = new CartPage(page);
    await productPage.shoppingCartLink.click();
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.productItems).toHaveCount(0);
});