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

  test("Search filters practice cards", async ({ practicesPage }) => {
    await test.step("Search for Drag and Drop", async () => {
      await practicesPage.searchPractice("Drag and Drop");
    });

    await test.step("Verify results", async () => {
      await expect(
        practicesPage.practiceCardLink("Drag and Drop")
      ).toBeVisible();
      await expect(
        practicesPage.practiceCardLink("Test Login Page")
      ).toBeHidden();
    });
  });
});
