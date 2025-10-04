import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ForgotPasswordPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading("Reset your password");
  }

  // ===== NAVIGATIONS =====
  async navigateForgotPasswordPage(): Promise<void> {
    await this.navigatePage("/notes/app/forgot-password");
  }
}
