import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { ModalsPage } from "./modals.page";
import { NotesDashboardPage } from "./notes-dashboard.page";
import { ProfileSettingsPage } from "./profile-settings.page";
import { ForgotPasswordPage } from "./forgot-password.page";
import { RegisterPage } from "./register.page";
import { PracticePage } from "./practice.page";

export class PageFactory {
  constructor(
    private page: Page,
    private isMobile: boolean | undefined
  ) {}

  getLoginPage(): LoginPage {
    return new LoginPage(this.page, this.isMobile);
  }

  getNotesDashboardPage(): NotesDashboardPage {
    return new NotesDashboardPage(this.page, this.isMobile);
  }

  getModalsPage(): ModalsPage {
    return new ModalsPage(this.page, this.isMobile);
  }

  getProfileSettingsPage(): ProfileSettingsPage {
    return new ProfileSettingsPage(this.page, this.isMobile);
  }

  getForgotPasswordPage(): ForgotPasswordPage {
    return new ForgotPasswordPage(this.page, this.isMobile);
  }

  getRegisterPage(): RegisterPage {
    return new RegisterPage(this.page, this.isMobile);
  }

  getPracticePage(): PracticePage {
    return new PracticePage(this.page, this.isMobile);
  }
}
