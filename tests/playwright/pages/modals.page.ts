import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ModalsPage extends BasePage {
  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====

  get addNewNoteTitleInput(): Locator {
    return this.testIdSelector("note-title");
  }

  get createButton(): Locator {
    return this.button("Create");
  }

  // ===== LOCATOR METHODS =====
  modalHeading(text: string): Locator {
    return this.page.getByRole("dialog").getByText(text, { exact: true });
  }

  // ===== NAVIGATION =====

  // ===== INTERACTIONS =====
}
