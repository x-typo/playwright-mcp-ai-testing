import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PracticePage extends BasePage {
  private readonly selectors = {
    pageHeading: "Automation Testing Practice WebSite for QA and Developers",
    testCasesLink: "Test Cases",
    searchInput: "Search an example...",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }

  get testCasesButton(): Locator {
    return this.link(this.selectors.testCasesLink);
  }

  get searchInput(): Locator {
    return this.inputBox(this.selectors.searchInput);
  }
}
