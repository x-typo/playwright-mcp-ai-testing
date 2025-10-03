import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProfileSettingsPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS=====
  get pageHeading(): Locator {
    return this.heading("Profile settings");
  }
  get accountDetailsTab(): Locator {
    return this.testIdSelector("account-details");
  }
  get changePasswordTab(): Locator {
    return this.testIdSelector("change-password");
  }
  get userIdInput(): Locator {
    return this.testIdSelector("user-id");
  }
  get currentPasswordInput(): Locator {
    return this.testIdSelector("current-password");
  }
  // ===== LOCATOR METHODS =====
  // ===== NAVIGATIONS =====
  async navigateProfileSettingsPage(): Promise<void> {
    await this.navigatePage("/notes/app/profile");
  }
  // ===== INTERACTIONS =====
  async openAccountDetailsTab(): Promise<void> {
    await this.selectTestIdSelector("account-details");
  }
  async openChangePasswordTab(): Promise<void> {
    await this.selectTestIdSelector("change-password");
  }
}
