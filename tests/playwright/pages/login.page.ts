import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.ts";

export class LoginPage extends BasePage {
  private readonly selectors = {
    pageHeading: "Login",
    emailInput: "Email",
    passwordInput: "Password",
    loginButton: "login-submit",
    googleLoginButton: "login-with-google",
    forgotPasswordLink: "Forgot password",
    createAccountLink: "Create a free account!",
    practicesBreadcrumb: "Practice",
  } as const;

  constructor(page: Page, isMobile: boolean | undefined) {
    super(page, isMobile);
  }

  // ===== LOCATOR GETTERS =====
  get loginPageHeading(): Locator {
    return this.heading(this.selectors.pageHeading);
  }
  get emailInputBox(): Locator {
    return this.inputBox(this.selectors.emailInput);
  }
  get passwordInputBox(): Locator {
    return this.inputBox(this.selectors.passwordInput);
  }
  get loginButton(): Locator {
    return this.testIdSelector(this.selectors.loginButton);
  }
  get googleLoginButton(): Locator {
    return this.testIdSelector(this.selectors.googleLoginButton);
  }
  get forgotPasswordLink(): Locator {
    return this.link(this.selectors.forgotPasswordLink);
  }
  get createAccountLink(): Locator {
    return this.link(this.selectors.createAccountLink);
  }
  get practiceBreadcrumb(): Locator {
    return this.link(this.selectors.practicesBreadcrumb);
  }

  // ===== NAVIGATIONS =====
  async navigateLoginPage(): Promise<void> {
    await this.navigatePage("/notes/app/login");
  }

  // ===== INTERACTIONS =====
  async selectLoginButton(): Promise<void> {
    await this.selectTestIdSelector(this.selectors.loginButton);
  }

  async login({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }): Promise<void> {
    await this.emailInputBox.fill(emailAddress);
    await this.passwordInputBox.fill(password);
    await this.selectLoginButton();
  }

  async selectForgotPasswordLink(): Promise<void> {
    await this.selectLink(this.selectors.forgotPasswordLink);
  }

  async selectCreateAccountLink(): Promise<void> {
    await this.selectLink(this.selectors.createAccountLink);
  }

  async selectPracticesBreadcrumb(): Promise<void> {
    await this.selectLink(this.selectors.practicesBreadcrumb);
  }
}
