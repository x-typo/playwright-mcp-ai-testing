import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { ModalsPage } from "./modals.page";
import { NotesDashboardPage } from "./notes-dashboard.page";
import { NotesProfileSettingsPage } from "./notes-profile-settings.page";
import { ForgotPasswordPage } from "./forgot-password.page";
import { NotesRegisterPage } from "./notes-register.page";
import { PracticesPage } from "./practices.page";

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

  getProfileSettingsPage(): NotesProfileSettingsPage {
    return new NotesProfileSettingsPage(this.page, this.isMobile);
  }

  getForgotPasswordPage(): ForgotPasswordPage {
    return new ForgotPasswordPage(this.page, this.isMobile);
  }

  getNotesRegisterPage(): NotesRegisterPage {
    return new NotesRegisterPage(this.page, this.isMobile);
  }

  getPracticesPage(): PracticesPage {
    return new PracticesPage(this.page, this.isMobile);
  }
}
