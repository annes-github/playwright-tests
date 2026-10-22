import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig(
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/", "playwright/"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["e2e/**/*.ts"],
    ...playwright.configs["flat/recommended"],
  },
  {
    // Login setup saves auth state; it isn't a test, so it has no assertions.
    files: ["e2e/auth-setup.ts"],
    rules: {
      "playwright/expect-expect": "off",
    },
  },
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/semi": ["error", "always"],
    },
  },
);
