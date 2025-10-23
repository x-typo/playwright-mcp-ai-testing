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

  test("Navigate to page via link in card", async ({
    practicesPage,
    notesDashboardPage,
  }) => {
    await test.step("Search for practice", async () => {
      await practicesPage.searchPractice("Notes App | React");
    });

    await test.step("Select link on practice card", async () => {
      await practicesPage.selectPracticeCardLink("Notes App | React");
    });

    await test.step("Verify", async () => {
      await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
      await expect(notesDashboardPage.addNoteButton).toBeVisible();
    });
  });

  test("Navigate to page via 'Try It Out' button in card", async ({
    practicesPage,
    notesDashboardPage,
  }) => {
    await test.step("Search for practice", async () => {
      await practicesPage.searchPractice("Notes App | React");
    });

    await test.step("Click Try it out button", async () => {
      await practicesPage.selectPracticeCardTryItOutButton("Notes App | React");
    });

    await test.step("Verify", async () => {
      await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
      await expect(notesDashboardPage.addNoteButton).toBeVisible();
    });
  });

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

  test(
    "Visual Test",
    { tag: ["@visual", "@smoke", "@regression"] },
    async ({ practicesPage }) => {
      const snapshotName = "practicesPage_.png";
      const ratioAllowed = 0.1;

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
