import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ModalsPage extends BasePage {
  private readonly selectors = {
    addNoteTitleInput: "note-title",
    addNoteDescriptionInput: "note-description",
    submitButton: "note-submit",
    deleteButton: "note-delete-confirm",
    cancelButton: "Cancel",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====

  get addNoteTitleInputBox(): Locator {
    return this.testIdSelector(this.selectors.addNoteTitleInput);
  }

  get addNoteDescriptionInputBox(): Locator {
    return this.testIdSelector(this.selectors.addNoteDescriptionInput);
  }

  get submitButton(): Locator {
    return this.testIdSelector(this.selectors.submitButton);
  }

  get deleteButton(): Locator {
    return this.testIdSelector(this.selectors.deleteButton);
  }

  get cancelButton(): Locator {
    return this.button(this.selectors.cancelButton);
  }

  // ===== LOCATOR METHODS =====
  modalHeading(text: string): Locator {
    return this.page.getByRole("dialog").getByText(text, { exact: true });
  }

  // ===== NAVIGATIONS =====

  // ===== INTERACTIONS =====
  async fillAndSubmitNoteForm(
    title: string,
    description: string
  ): Promise<void> {
    await this.addNoteTitleInputBox.fill(title);
    await this.addNoteDescriptionInputBox.fill(description);
    await this.selectSubmitButton();
  }

  async selectDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async selectSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
