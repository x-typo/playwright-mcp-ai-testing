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

  get addNewNoteDescriptionInput(): Locator {
    return this.testIdSelector("note-description");
  }

  get submitButton(): Locator {
    return this.testIdSelector("note-submit");
  }

  get deleteButton(): Locator {
    return this.testIdSelector("note-delete-confirm");
  }

  // ===== LOCATOR METHODS =====
  modalHeading(text: string): Locator {
    return this.page.getByRole("dialog").getByText(text, { exact: true });
  }

  // ===== NAVIGATION =====

  // ===== INTERACTIONS =====
  async fillAndSubmitNoteForm(
    title: string,
    description: string
  ): Promise<void> {
    await this.addNewNoteTitleInput.fill(title);
    await this.addNewNoteDescriptionInput.fill(description);
    await this.selectSubmitButton();
  }

  async selectDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async selectSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
