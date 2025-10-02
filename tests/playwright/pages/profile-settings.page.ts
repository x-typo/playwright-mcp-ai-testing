import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProfileSettingsPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS=====
  get pageHeading(): Locator {
    return this.heading("Profile settings");
  }
  // ===== LOCATOR METHODS =====
  // ===== NAVIGATIONS =====
  // ===== INTERACTIONS =====
}
