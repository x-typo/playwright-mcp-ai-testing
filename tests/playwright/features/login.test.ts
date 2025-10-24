import { test, expect, asUser } from "../../../fixtures/automation-fixtures";

test.use(asUser("guest"));

test.describe("Login Page", () => {
  test.beforeEach("Navigate to page", async ({ loginPage }) => {
    await loginPage.navigateLoginPage();
  });

  test("Successful Login", async ({ loginPage, notesDashboardPage }) => {
    const validCreds = {
      emailAddress: process.env.MAIN_USERNAME!,
      password: process.env.MAIN_PASSWORD!,
    };

    await test.step("Login with valid credentials", async () => {
      await loginPage.login(validCreds);
    });

    await test.step("Verify", async () => {
      await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
    });
  });

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ loginPage }) => {
      await test.step("Verify", async () => {
        await expect(loginPage.emailInputBox).toBeVisible();
        await expect(loginPage.passwordInputBox).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });
    }
  );

  test("Invalid Password", async ({ loginPage }) => {
    await test.step("Submit invalid password", async () => {
      await loginPage.login({
        emailAddress: "email@email.com",
        password: "pass",
      });
    });

    await test.step("Verify", async () => {
      await expect(
        loginPage.text("Password should be between 6 and 30 characters")
      ).toBeVisible();
    });
  });

  test("Invalid Email Address", async ({ loginPage }) => {
    await test.step("Submit invalid email address", async () => {
      await loginPage.login({
        emailAddress: "invalidAddress",
        password: "password12345!",
      });
    });

    await test.step("Verify", async () => {
      await expect(loginPage.text("Email address is invalid")).toBeVisible();
    });
  });

  test("Notes Register Page Navigation", async ({
    loginPage,
    notesRegisterPage,
  }) => {
    await test.step("Select link", async () => {
      await loginPage.selectCreateAccountLink();
    });

    await test.step("Verify", async () => {
      await expect(notesRegisterPage.pageHeading).toBeVisible();
    });
  });

  test("Forgot Password Page Navigation", async ({
    loginPage,
    forgotPasswordPage,
  }) => {
    await test.step("Select link", async () => {
      await loginPage.selectForgotPasswordLink();
    });

    await test.step("Verify", async () => {
      await expect(forgotPasswordPage.pageHeading).toBeVisible();
    });
  });

  test("Navigate to Practice Page via Breadcrumb", async ({
    loginPage,
    practicesPage,
  }) => {
    await test.step("Select breadcrumb", async () => {
      await loginPage.selectPracticesBreadcrumb();
    });

    await test.step("Verify", async () => {
      await expect(practicesPage.pageHeading).toBeVisible();
      await expect(practicesPage.searchInputBox).toBeVisible();
    });
  });

  test(
    "Visual Test",
    { tag: ["@visual", "@smoke", "@regression"] },
    async ({ loginPage }) => {
      const snapshotName = "loginPage_.png";
      const ratioAllowed = 0.03;

      await test.step("Perform visual comparison", async () => {
        await expect(loginPage.emailInputBox).toBeVisible();
        expect(
          await loginPage.page.screenshot({
            animations: "disabled",
            mask: [loginPage.googleLoginButton],
          })
        ).toMatchSnapshot(snapshotName, { maxDiffPixelRatio: ratioAllowed });
      });
    }
  );

  test(
    "Accessibility Test",
    { tag: ["@accessibility", "@regression"] },
    async ({ loginPage, performAccessibilityScan }) => {
      test.fail();
      await test.step("Run accessibility scan", async () => {
        await expect(loginPage.emailInputBox).toBeVisible();
        const violationCount = await performAccessibilityScan();
        expect(
          violationCount,
          `Found ${violationCount} accessibility violation(s). Check console output above for details.`
        ).toBe(0);
      });
    }
  );
});
