import { test, expect, asUser } from "../../../fixtures/automation-fixtures";

test.use(asUser("guest"));

test.describe("Notes Register Page", () => {
  test.beforeEach("Navigate to page", async ({ notesRegisterPage }) => {
    await notesRegisterPage.navigateNotesRegisterPage();
  });

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ notesRegisterPage }) => {
      await test.step("Verify", async () => {
        await expect(notesRegisterPage.pageHeading).toBeVisible();
      });
    }
  );
});
