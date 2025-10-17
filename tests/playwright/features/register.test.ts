import { test, expect, asUser } from "../../../fixtures/automation-fixtures";

test.use(asUser("guest"));

test.describe("Register Page", () => {
  test.beforeEach("Navigate to page", async ({ registerPage }) => {
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
