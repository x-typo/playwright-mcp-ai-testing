import { test, expect } from "@playwright/test";
import { AiLoginPage } from "../../pages/ai-login.page";

test.describe("Login Page Visibility", () => {
  test("Display login form elements on the Login page", async ({ page }) => {
    const loginPage = new AiLoginPage(page);
    await loginPage.goto();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
