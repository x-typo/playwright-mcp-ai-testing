import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NotesDashboardPage extends BasePage {
  private readonly selectors = {
    myNotesLink: "home",
    addNoteButton: "add-new-note",
    addNoteCategoryDropdown: "note-category",
    addNoteCompletedStatusCheckbox: "note-completed",
    searchInput: "search-input",
    searchButton: "search-btn",
    editCardButton: "note-edit",
    deleteCardButton: "note-delete",
    profileSettingsLinkButton: "profile",
    logoutButton: "Logout",
    noteCardTitle: "note-card-title",
    noteCardDescription: "note-card-description",
    allCategory: "All",
    workCategory: "Work•",
    homeCategory: "Home•",
    personalCategory: "Personal•",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get myNotesLinkButton(): Locator {
    return this.testIdSelector(this.selectors.myNotesLink);
  }
  get addNoteButton(): Locator {
    return this.testIdSelector(this.selectors.addNoteButton);
  }
  get addNoteCategoryDropdown(): Locator {
    return this.testIdSelector(this.selectors.addNoteCategoryDropdown);
  }
  get addNoteCompletedStatusCheckbox(): Locator {
    return this.testIdSelector(this.selectors.addNoteCompletedStatusCheckbox);
  }
  get searchInputBox(): Locator {
    return this.testIdSelector(this.selectors.searchInput);
  }
  get searchButton(): Locator {
    return this.testIdSelector(this.selectors.searchButton);
  }
  get editCardButton(): Locator {
    return this.testIdSelector(this.selectors.editCardButton);
  }
  get deleteCardButton(): Locator {
    return this.testIdSelector(this.selectors.deleteCardButton);
  }
  get profileSettingsLinkButton(): Locator {
    return this.testIdSelector(this.selectors.profileSettingsLinkButton);
  }
  get logoutButton(): Locator {
    return this.button(this.selectors.logoutButton);
  }
  get mobileNavigationToggle(): Locator {
    return this.page
      .locator("nav")
      .filter({ has: this.profileSettingsLinkButton })
      .getByRole("button")
      .first();
  }
  get allCategoryButton(): Locator {
    return this.button(this.selectors.allCategory);
  }
  get workCategoryButton(): Locator {
    return this.button(this.selectors.workCategory);
  }
  get homeCategoryButton(): Locator {
    return this.button(this.selectors.homeCategory);
  }
  get personalCategoryButton(): Locator {
    return this.button(this.selectors.personalCategory);
  }

  // ===== LOCATOR METHODS =====
  noteCardTitle(name: string): Locator {
    return this.testIdSelector(this.selectors.noteCardTitle).filter({
      hasText: name,
    });
  }
  noteCardDescription(name: string): Locator {
    return this.testIdSelector(this.selectors.noteCardDescription).filter({
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
    await this.selectTestIdSelector(this.selectors.searchButton);
  }

  async selectCategoryButton(
    category: "All" | "Work" | "Home" | "Personal"
  ): Promise<void> {
    const categoryMap = {
      All: this.selectors.allCategory,
      Work: this.selectors.workCategory,
      Home: this.selectors.homeCategory,
      Personal: this.selectors.personalCategory,
    };
    await this.selectButton(categoryMap[category]);
  }

  async selectAddNoteButton(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.addNoteButton);
  }

  async selectEditButton(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.editCardButton);
  }

  async selectDeleteButton(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.deleteCardButton);
  }

  async selectProfileSettingsButton(): Promise<void> {
    if (this.isMobile) {
      await this.mobileNavigationToggle.click();
    }
    await this.selectTestIdSelector(this.selectors.profileSettingsLinkButton);
  }

  async selectNavigationMenuOnMobile(): Promise<void> {
    if (this.isMobile) {
      await this.mobileNavigationToggle.click();
    }
  }
}
