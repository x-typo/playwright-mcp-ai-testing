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

  // ===== LOCATOR METHODS =====
  noteCardTitle(name: string): Locator {
    return this.testIdSelector("note-card-title").filter({ hasText: name });
  }
  noteCardDescription(name: string): Locator {
    return this.testIdSelector("note-card-description").filter({
      hasText: name,
    });
  }
  tabButton(name: string): Locator {
    return this.testIdSelector(name);
  }

  // Tabs
  get allTab(): Locator {
    return this.tabButton("category-all");
  }
  get workTab(): Locator {
    return this.tabButton("category-work");
  }
  get homeTab(): Locator {
    return this.tabButton("category-home");
  }
  get personalTab(): Locator {
    return this.tabButton("category-personal");
  }

  // ===== NAVIGATION =====
  async navigateNotesDashboardPage(): Promise<void> {
    await this.navigatePage("/notes/app");
  }

  async expectOnDashboard(): Promise<void> {
    await this.expectVisible(this.myNotesLinkButton);
  }

  // ===== INTERACTIONS =====
  async searchNotes(note: string): Promise<void> {
    await this.searchInputBox.fill(note);
    await this.searchButton.click();
  }

  async selectTab(name: string): Promise<void> {
    await this.tabButton(name).click();
  }

  async selectAddNoteButton(): Promise<void> {
    await this.addNoteButton.click();
  }

  async selectEditButton(): Promise<void> {
    await this.editCardButton.click();
  }

  async selectDeleteButton(): Promise<void> {
    await this.deleteCardButton.click();
  }
}
