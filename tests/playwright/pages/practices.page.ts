import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PracticesPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Automation Testing Practice WebSite for QA and Developers",
    searchInput: "Search an example...",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }

  get searchInput(): Locator {
    return this.inputBox(this.selectors.searchInput);
  }

  // ===== LOCATOR METHODS =====
  practiceCardLink(title: string): Locator {
    return this.link(title);
  }

  practiceCardTryItOutButton(practiceTitle: string): Locator {
    return this.page
      .locator(".card")
      .filter({ hasText: practiceTitle })
      .getByRole("link", { name: "Try it out" });
  }

  // ===== NAVIGATIONS =====
  async navigatePracticesPage(): Promise<void> {
    await this.navigatePage("");
  }

  // ===== INTERACTIONS =====
  async searchPractice(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  async selectPracticeCardLink(title: string): Promise<void> {
    await this.practiceCardLink(title).click();
  }

  async selectPracticeCardTryItOutButton(practiceTitle: string): Promise<void> {
    await this.practiceCardTryItOutButton(practiceTitle).click();
  }
}
