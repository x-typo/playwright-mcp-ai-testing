import { expect, Page } from "@playwright/test";

export class AiLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://desktop.dev.ovrc.com/#/login");
  }

  get emailInput() {
    return this.page.locator('input[type="email"]');
  }

  get passwordInput() {
    return this.page.locator('input[type="password"]');
  }

  get loginButton() {
    return this.page.getByRole("button", { name: /Log In/i });
  }
}
