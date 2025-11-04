import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.ts";

export class ForgotPasswordPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Reset your password",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }

  // ===== LOCATOR METHODS =====

  // ===== NAVIGATIONS =====
  async navigateForgotPasswordPage(): Promise<void> {
    await this.navigatePage("/notes/app/forgot-password");
  }

  // ===== INTERACTIONS =====
}
