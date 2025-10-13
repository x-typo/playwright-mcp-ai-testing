import { test, expect } from "../../../fixtures/automation-fixtures";

test.describe("Practices page", () => {
  test.beforeEach("Navigate to practices page", async ({ practicesPage }) => {
    await practicesPage.navigatePracticesPage();
  });

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ practicesPage }) => {
      await test.step("Verify", async () => {
        await expect(practicesPage.pageHeading).toBeVisible();
        await expect(practicesPage.searchInput).toBeVisible();
      });
    }
  );
});
