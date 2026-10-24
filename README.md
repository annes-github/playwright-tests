# Sauce Demo – Playwright Test Suite

End-to-end tests for [Sauce Demo](https://www.saucedemo.com), a practice e-commerce site, written in TypeScript with [Playwright](https://playwright.dev). The suite covers the main shopping flow, from login through checkout, and runs in Chromium, Firefox and WebKit.

## What's covered

| Area | What's tested |
|---|---|
| **Login** | Valid credentials, invalid credentials, locked-out user |
| **Product page** | Default A–Z sort, Z–A and price sorting, every product's name, price, description and image, an "Add to cart" button for each product, adding and removing items |
| **Cart** | Removing an item, Continue Shopping, going to checkout |
| **Checkout: your information** | Required-field errors for first name, last name and zip code, valid submission |
| **Checkout: overview** | Name, description, price and quantity for each product, payment and shipping info, item total, tax and order total, Cancel and Finish |

## Approach

- **Page Object Model.** Each page has a class in `page-objects/` that keeps its locators and actions in one place. The product, cart and checkout overview pages all show lists of products, so they share an `ItemListPage` base class with helpers like `getPriceForProduct(product)`.
- **Logging in once.** A setup project ([`e2e/auth-setup.ts`](e2e/auth-setup.ts)) logs in and saves the browser session. All other tests reuse it, so they start directly on the page they test. The login tests start without a saved session.
- **Expected values come from test data.** Product names, prices and descriptions are stored in [`data/product-list.json`](data/product-list.json) and used for the expected values in tests.
- **Linting.** ESLint with [`eslint-plugin-playwright`](https://github.com/playwright-community/eslint-plugin-playwright) flags common mistakes, such as a missing `await` on a Playwright call.

## Project structure

```
├── data/
│   └── product-list.json      # Expected product names, prices and descriptions
├── e2e/
│   ├── auth-setup.ts          # Logs in once and saves the session
│   ├── helpers.ts             # Price parsing and sorting helpers
│   └── *.spec.ts              # Test files, one per page or area
├── page-objects/              # Page Object Model classes
├── eslint.config.mjs
└── playwright.config.ts
```

## Running the tests

Requires [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install
npx playwright install     # download the browsers
npm test                   # run all tests in all browsers
npx playwright show-report # open the HTML report
```

Other useful commands:

```bash
npx playwright test --project=chromium   # one browser only
npx playwright test --ui                 # interactive UI mode
npm run lint                             # run ESLint
```
