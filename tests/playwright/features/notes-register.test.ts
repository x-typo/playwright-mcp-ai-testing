import { test, expect, asUser } from "../../../fixtures/automation-fixtures";

test.use(asUser("guest"));

test.describe("Notes Register Page", () => {
  test.beforeEach("Navigate to page", async ({ notesRegisterPage }) => {
    await notesRegisterPage.navigateNotesRegisterPage();
  });

  test(
    "Verify Page Elements",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage }) => {
      await test.step("Verify", async () => {
        await expect(notesRegisterPage.pageHeading).toBeVisible();
      });
    }
  );

  test(
    "Email Instruction Visible",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage }) => {
      await test.step("Verify", async () => {
        await expect(notesRegisterPage.emailInstruction).toBeVisible();
      });
    }
  );

  test(
    "Required Field Errors",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage }) => {
      await test.step("Submit without input", async () => {
        await notesRegisterPage.selectRegisterButton();
      });

      await test.step("Verify", async () => {
        await expect(notesRegisterPage.emailRequiredError).toBeVisible();
        await expect(notesRegisterPage.nameRequiredError).toBeVisible();
        await expect(notesRegisterPage.passwordRequiredError).toBeVisible();
        await expect(
          notesRegisterPage.confirmPasswordRequiredError
        ).toBeVisible();
      });
    }
  );

  test(
    "Navigate to Login Page",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage, loginPage }) => {
      await test.step("Select login link", async () => {
        await notesRegisterPage.selectLoginLink();
      });

      await test.step("Verify login page elements", async () => {
        await expect(loginPage.loginPageHeading).toBeVisible();
        await expect(loginPage.emailInputBox).toBeVisible();
        await expect(loginPage.passwordInputBox).toBeVisible();
      });
    }
  );

  test(
    "Navigate to Practice Page via Breadcrumb",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage, practicesPage }) => {
      await test.step("Select practice page breadcrumb", async () => {
        await notesRegisterPage.selectPracticeBreadcrumb();
      });

      await test.step("Verify practice page elements", async () => {
        await expect(practicesPage.pageHeading).toBeVisible();
      });
    }
  );

  test(
    "Visual Regression",
    { tag: ["@visual", "@smoke", "@regression"] },
    async ({ notesRegisterPage }) => {
      const snapshotName = "notesRegisterPage_.png";
      const ratioAllowed = 0.03;

      await test.step("Perform visual comparison", async () => {
        await expect(notesRegisterPage.pageHeading).toBeVisible();
        expect(
          await notesRegisterPage.page.screenshot({
            animations: "disabled",
          })
        ).toMatchSnapshot(snapshotName, { maxDiffPixelRatio: ratioAllowed });
      });
    }
  );
});
