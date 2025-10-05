import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NotesDashboardPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get myNotesLinkButton(): Locator {
    return this.testIdSelector("home");
  }
  get addNoteButton(): Locator {
    return this.testIdSelector("add-new-note");
  }
  get addNoteCategoryDropdown(): Locator {
    return this.testIdSelector("note-category");
  }
  get addNoteCompletedStatusCheckbox(): Locator {
    return this.testIdSelector("note-completed");
  }
  get searchInputBox(): Locator {
    return this.testIdSelector("search-input");
  }
  get searchButton(): Locator {
    return this.testIdSelector("search-btn");
  }
  get editCardButton(): Locator {
    return this.testIdSelector("note-edit");
  }
  get deleteCardButton(): Locator {
    return this.testIdSelector("note-delete");
  }
  get profileSettingsLinkButton(): Locator {
    return this.testIdSelector("profile");
  }
  get mobileNavigationToggle(): Locator {
    return this.page
      .locator("nav")
      .filter({ has: this.profileSettingsLinkButton })
      .getByRole("button")
      .first();
  }
  get allCategoryButton(): Locator {
    return this.button("All");
  }
  get workCategoryButton(): Locator {
    return this.button("Work•");
  }
  get homeCategoryButton(): Locator {
    return this.button("Home•");
  }
  get personalCategoryButton(): Locator {
    return this.button("Personal•");
  }

  // ===== LOCATOR METHODS =====
  noteCardTitle(name: string): Locator {
    return this.testIdSelector("note-card-title").filter({ hasText: name });
  }
  noteCardDescription(name: string): Locator {
    return this.testIdSelector("note-card-description").filter({
      hasText: name,
    });
  }
  // ===== NAVIGATIONS =====
  async navigateNotesDashboardPage(): Promise<void> {
    await this.navigatePage("/notes/app");
  }

  // ===== INTERACTIONS =====
  async searchNotes(note: string): Promise<void> {
    await this.searchInputBox.fill(note);
    await this.selectTestIdSelector("search-btn");
  }

  async selectAllCategoryButton(): Promise<void> {
    await this.selectButton("All");
  }

  async selectWorkCategoryButton(): Promise<void> {
    await this.selectButton("Work•");
  }

  async selectHomeCategoryButton(): Promise<void> {
    await this.selectButton("Home•");
  }

  async selectPersonalCategoryButton(): Promise<void> {
    await this.selectButton("Personal•");
  }
  async selectAddNoteButton(): Promise<void> {
    await this.selectTestIdSelector("add-new-note");
  }

  async selectEditButton(): Promise<void> {
    await this.selectTestIdSelector("note-edit");
  }

  async selectDeleteButton(): Promise<void> {
    await this.selectTestIdSelector("note-delete");
  }

  async selectProfileSettingsButton(): Promise<void> {
    if (this.isMobile) {
      await this.mobileNavigationToggle.click();
    }
    await this.selectTestIdSelector("profile");
  }
}
