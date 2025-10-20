import { test, expect } from "../../../fixtures/automation-fixtures";

test.describe("Practices page", () => {
  test.beforeEach("Navigate to page", async ({ practicesPage }) => {
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
    await test.step("Search for practice", async () => {
      await practicesPage.searchPractice("Drag and Drop");
    });

    await test.step("Verify", async () => {
      await expect(
        practicesPage.practiceCardLink("Drag and Drop")
      ).toBeVisible();
      await expect(
        practicesPage.practiceCardLink("Test Login Page")
      ).toBeHidden();
    });
  });

  test("Navigate to Notes App via practice card", async ({
    practicesPage,
    notesDashboardPage,
  }) => {
    await test.step("Search for practice", async () => {
      await practicesPage.searchPractice("Notes App | React");
    });

    await test.step("Select link on practice card", async () => {
      await practicesPage.practiceCardLink("Notes App | React").click();
    });

    await test.step("Verify", async () => {
      await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
      await expect(notesDashboardPage.addNoteButton).toBeVisible();
    });
  });

  test.fixme(
    "Visual Test",
    { tag: ["@visual", "@smoke", "@regression"] },
    async ({ practicesPage }) => {
      const snapshotName = "practicesPage_.png";
      const ratioAllowed = 0.03;

      await test.step("Perform visual comparison", async () => {
        await expect(practicesPage.searchInput).toBeVisible();
        expect(
          await practicesPage.page.screenshot({
            animations: "disabled",
            mask: [],
          })
        ).toMatchSnapshot(snapshotName, { maxDiffPixelRatio: ratioAllowed });
      });
    }
  );
});
