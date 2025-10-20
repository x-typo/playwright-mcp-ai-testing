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
