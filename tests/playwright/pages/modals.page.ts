import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ModalsPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get addNewNoteHeading(): Locator {
    return this.heading("Add new note");
  }

  get addNewNoteTitleInput(): Locator {
    return this.testIdSelector("note-title");
  }

  get addNewNoteCreateButton(): Locator {
    return this.button("Create");
  }

  // ===== LOCATOR METHODS =====

  // ===== NAVIGATION =====

  // ===== INTERACTIONS =====
}
