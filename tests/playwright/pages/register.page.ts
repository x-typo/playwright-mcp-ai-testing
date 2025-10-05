import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading("Register");
  }

  // ===== NAVIGATION =====
  async navigateRegisterPage(): Promise<void> {
    await this.navigatePage("/notes/app/register");
  }
}
