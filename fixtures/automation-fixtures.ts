import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { asUser, UserRole } from "../auth/authManager";
import { test as base, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { NotesClient } from "../api/clients/notes.client";
import { ApiClientFactory } from "../api/clients/api-client-factory";
import { HealthApiClient } from "../api/clients/health.api-client";
import { PageFactory } from "../tests/playwright/pages/page-factory.page.ts";
import { BasePage } from "../tests/playwright/pages/base.page.ts";
import { LoginPage } from "../tests/playwright/pages/login.page.ts";
import { NotesDashboardPage } from "../tests/playwright/pages/notes-dashboard.page.ts";
import { ModalsPage } from "../tests/playwright/pages/modals.page.ts";
import { NotesProfileSettingsPage } from "../tests/playwright/pages/notes-profile-settings.page.ts";
import { ForgotPasswordPage } from "../tests/playwright/pages/forgot-password.page.ts";
import { NotesRegisterPage } from "../tests/playwright/pages/notes-register.page.ts";
import { PracticesPage } from "../tests/playwright/pages/practices.page.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API token from storage state
const storageStatePath = path.resolve(
  __dirname,
  "../auth/storageStates/mainAccountSetup.json"
);
if (fs.existsSync(storageStatePath)) {
  const storageState = JSON.parse(fs.readFileSync(storageStatePath, "utf-8"));
  const apiOrigin = process.env.API_BASE_URL!;
  const token = storageState.origins
    ?.find((o: any) => o.origin === apiOrigin)
    ?.localStorage.find((l: any) => l.name === "token")?.value;

  if (token) {
    process.env.API_TOKEN = token;
  }
}

// Domains to block in UI tests
const blockedDomains = [
  "https://www.googleadservices.com",
  "https://pagead2.googlesyndication.com",
  "https://googleads.g.doubleclick.net",
  "https://www.google.com",
  "https://tpc.googlesyndication.com",
];

type AutomationFixtures = {
  // Utilities
  readFile: (path: string) => Promise<string>;
  generateRandomText: (length?: number) => string;
  performAccessibilityScan: () => Promise<any>;

  // API
  notesClient: NotesClient;
  apiClientFactory: typeof ApiClientFactory;
  healthClient: HealthApiClient;

  // Pages
  pageFactory: PageFactory;
  basePage: BasePage;
  loginPage: LoginPage;
  notesDashboardPage: NotesDashboardPage;
  modalsPage: ModalsPage;
  profileSettingsPage: NotesProfileSettingsPage;
  forgotPasswordPage: ForgotPasswordPage;
  notesRegisterPage: NotesRegisterPage;
  practicesPage: PracticesPage;
};

export const test = base.extend<AutomationFixtures>({
  // Ads block setup
  context: async ({ context }, use) => {
    await context.route("**/*", (route) => {
      const url = route.request().url();
      blockedDomains.some((domain) => url.startsWith(domain))
        ? route.abort()
        : route.continue();
    });
    await use(context);
  },

  // Utilities
  readFile: async ({}, use) => {
    await use((path: string) => fs.promises.readFile(path, "utf-8"));
  },
  generateRandomText: async ({}, use) => {
    await use((length = 10) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
    });
  },

  // --- API ---
  apiClientFactory: async ({}, use) => {
    await use(ApiClientFactory);
  },
  healthClient: async ({}, use) => {
    await use(await ApiClientFactory.getHealthClient());
  },
  notesClient: async ({}, use) => {
    await use(await ApiClientFactory.getNotesClient());
  },

  // --- Pages ---
  pageFactory: async ({ page, isMobile }, use) => {
    await use(new PageFactory(page, isMobile));
  },
  basePage: async ({ page, isMobile }, use) => {
    await use(new BasePage(page, isMobile));
  },
  loginPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getLoginPage());
  },
  notesDashboardPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getNotesDashboardPage());
  },
  modalsPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getModalsPage());
  },
  profileSettingsPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getProfileSettingsPage());
  },
  forgotPasswordPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getForgotPasswordPage());
  },
  notesRegisterPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getNotesRegisterPage());
  },
  practicesPage: async ({ pageFactory }, use) => {
    await use(pageFactory.getPracticesPage());
  },

  // Accessibility scan
  performAccessibilityScan: async ({ page }, use) => {
    await use(async () => {
      const results = await new AxeBuilder({ page }).analyze();
      const filteredViolations = results.violations.filter(
        (violation) =>
          violation.impact === "critical" || violation.impact === "serious"
      );

      if (filteredViolations.length > 0) {
        const violationSummary = filteredViolations
          .map((violation, index) => {
            const nodes = violation.nodes
              .map((node) => `     - ${node.target.join(" ")}`)
              .join("\n");
            return `\n  ${index + 1}. ${violation.id} (${violation.impact}) - ${violation.nodes.length} element(s)\n     Description: ${violation.description}\n     Elements:\n${nodes}`;
          })
          .join("\n");

        console.error(
          `\nAccessibility violations found:\n${violationSummary}\n`
        );
      }

      return filteredViolations.length;
    });
  },
});

export { expect, asUser };
export type { UserRole };
