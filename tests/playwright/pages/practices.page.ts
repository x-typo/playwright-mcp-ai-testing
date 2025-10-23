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
  cardLink(title: string): Locator {
    return this.link(title);
  }

  cardTryItOutButton(cardTitle: string): Locator {
    return this.page
      .locator(".card")
      .filter({ hasText: cardTitle })
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

  async selectCardLink(title: string): Promise<void> {
    await this.cardLink(title).click();
  }

  async selectCardTryItOutButton(cardTitle: string): Promise<void> {
    await this.cardTryItOutButton(cardTitle).click();
  }
}
