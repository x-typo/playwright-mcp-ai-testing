import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NotesRegisterPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Register",
    emailInput: "Email address",
    nameInput: "Name",
    passwordInput: "Password",
    confirmPasswordInput: "Confirm Password",
    registerButton: "register-submit",
    emailRequiredError: "Email address is required",
    nameRequiredError: "User name is required",
    passwordRequiredError: "Password is required",
    confirmPasswordRequiredError: "Confirm Password is required",
    loginLink: "Log in here!",
    emailInstruction:
      "Using a valid email address is highly recommended. This will enable you to reset your password if you forget it.",
    practicesBreadcrumb: "Practice",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get pageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }

  get emailInputBox(): Locator {
    return this.inputBox(this.selectors.emailInput);
  }

  get nameInputBox(): Locator {
    return this.inputBox(this.selectors.nameInput);
  }

  get passwordInputBox(): Locator {
    return this.inputBox(this.selectors.passwordInput);
  }

  get confirmPasswordInputBox(): Locator {
    return this.inputBox(this.selectors.confirmPasswordInput);
  }

  get registerButton(): Locator {
    return this.testIdSelector(this.selectors.registerButton);
  }

  get emailRequiredError(): Locator {
    return this.exactText(this.selectors.emailRequiredError);
  }

  get nameRequiredError(): Locator {
    return this.exactText(this.selectors.nameRequiredError);
  }

  get passwordRequiredError(): Locator {
    return this.exactText(this.selectors.passwordRequiredError);
  }

  get confirmPasswordRequiredError(): Locator {
    return this.exactText(this.selectors.confirmPasswordRequiredError);
  }

  get loginLink(): Locator {
    return this.link(this.selectors.loginLink);
  }

  get emailInstruction(): Locator {
    return this.text(this.selectors.emailInstruction);
  }

  get practiceBreadcrumb(): Locator {
    return this.link(this.selectors.practicesBreadcrumb);
  }

  // ===== NAVIGATION =====
  async navigateNotesRegisterPage(): Promise<void> {
    await this.navigatePage("/notes/app/register");
  }

  // ===== INTERACTIONS =====
  async selectRegisterButton(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.registerButton);
  }

  async selectLoginLink(): Promise<void> {
    await this.selectLink(this.selectors.loginLink);
  }

  async selectPracticeBreadcrumb(): Promise<void> {
    await this.selectLink(this.selectors.practicesBreadcrumb);
  }
}
