import { test, expect } from "../../../fixtures/automation-fixtures";

test.describe("Profile Settings Page", () => {
  test.beforeEach(
    "Navigate to profile settings page",
    async ({ profileSettingsPage }) => {
      await profileSettingsPage.navigateProfileSettingsPage();
    }
  );

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ profileSettingsPage }) => {
      await test.step("Verify", async () => {
        await expect(profileSettingsPage.pageHeading).toBeVisible();
      });
    }
  );
});
