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

  test(
    "Tabs display corresponding forms",
    { tag: ["@regression"] },
    async ({ profileSettingsPage }) => {
      await test.step("Account details tab shows user info", async () => {
        await profileSettingsPage.openAccountDetailsTab();
        await expect(profileSettingsPage.userIdInput).toBeVisible();
      });

      await test.step("Change password tab shows password fields", async () => {
        await profileSettingsPage.openChangePasswordTab();
        await expect(profileSettingsPage.currentPasswordInput).toBeVisible();
      });
    }
  );
});
