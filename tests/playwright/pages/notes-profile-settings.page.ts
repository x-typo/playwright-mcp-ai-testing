import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NotesProfileSettingsPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Profile settings",
    accountDetailsTab: "account-details",
    changePasswordTab: "change-password",
    userIdInput: "user-id",
    currentPasswordInput: "current-password",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }
  get accountDetailsTab(): Locator {
    return this.testIdSelector(this.selectors.accountDetailsTab);
  }
  get changePasswordTab(): Locator {
    return this.testIdSelector(this.selectors.changePasswordTab);
  }
  get userIdInputBox(): Locator {
    return this.testIdSelector(this.selectors.userIdInput);
  }
  get currentPasswordInputBox(): Locator {
    return this.testIdSelector(this.selectors.currentPasswordInput);
  }
  // ===== LOCATOR METHODS =====
  // ===== NAVIGATIONS =====
  async navigateProfileSettingsPage(): Promise<void> {
    await this.navigatePage("/notes/app/profile");
  }
  // ===== INTERACTIONS =====
  async openAccountDetailsTab(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.accountDetailsTab);
  }
  async openChangePasswordTab(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.changePasswordTab);
  }
}
