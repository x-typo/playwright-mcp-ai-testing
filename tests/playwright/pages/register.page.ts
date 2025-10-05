import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Register",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }

  // ===== NAVIGATION =====
  async navigateRegisterPage(): Promise<void> {
    await this.navigatePage("/notes/app/register");
  }
}
