import { test, expect } from "../../../fixtures/automation-fixtures";
import { asUser } from "../../../auth/authManager";

test.use(asUser("guest"));

test.describe("Register Page", () => {
  test.beforeEach("Navigate to register page", async ({ registerPage }) => {
    await registerPage.navigateRegisterPage();
  });

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ registerPage }) => {
      await test.step("Verify", async () => {
        await expect(registerPage.pageHeading).toBeVisible();
      });
    }
  );
});
