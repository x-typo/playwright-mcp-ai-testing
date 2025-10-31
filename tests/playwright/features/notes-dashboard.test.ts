import { test, expect } from "../../../fixtures/automation-fixtures";
import { getNoteIdByTitle } from "../../../api/utils/notes-helpers";

test.describe("Notes Dashboard Page", () => {
  test.beforeEach("Navigate to page", async ({ notesDashboardPage }) => {
    await notesDashboardPage.navigateNotesDashboardPage();
  });

  test(
    "Page Validation",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage }) => {
      await test.step("Verify", async () => {
        await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
        await expect(notesDashboardPage.searchInputBox).toBeVisible();
        await expect(notesDashboardPage.addNoteButton).toBeVisible();
      });
    }
  );

  test(
    "Add New Note",
    { tag: ["@smoke", "@regression"] },
    async ({
      notesDashboardPage,
      modalsPage,
      notesClient,
      generateRandomText,
    }) => {
      const noteSuffix = generateRandomText(8);
      const noteData = {
        title: `addNoteTest-${noteSuffix}`,
        description: `addNoteDescriptionTest-${noteSuffix}`,
      };

      await test.step("Create new note", async () => {
        await notesDashboardPage.selectAddNoteButton();
        await modalsPage.fillAndSubmitNoteForm(
          noteData.title,
          noteData.description
        );
      });

      await test.step("Verify", async () => {
        await expect(
          notesDashboardPage.noteCardTitle(noteData.title)
        ).toBeVisible();
      });

      await test.step("Teardown", async () => {
        const response = await notesClient.getAllNotes();
        const noteId = getNoteIdByTitle(response.data ?? [], noteData.title);
        if (noteId) {
          const deleteResponse = await notesClient.deleteNote(noteId);
          expect(deleteResponse.success).toBe(true);
          expect(deleteResponse.status).toBe(200);
        }
      });
    }
  );

  test(
    "Update Note",
    { tag: ["@smoke", "@regression"] },
    async ({
      notesDashboardPage,
      modalsPage,
      notesClient,
      generateRandomText,
    }) => {
      const noteSuffix = generateRandomText(8);
      const originalNote = {
        title: `originalNote-${noteSuffix}`,
        description: `originalDescription-${noteSuffix}`,
        category: "Work",
      };
      const updatedNote = {
        title: `${originalNote.title}-updated`,
        description: `${originalNote.description}-updated`,
        category: "Work",
      };
      let noteId: string | undefined;

      await test.step("Setup", async () => {
        const createNoteResponse = await notesClient.createNote({
          title: originalNote.title,
          description: originalNote.description,
          category: originalNote.category,
        });
        expect(createNoteResponse.success).toBe(true);
        expect(createNoteResponse.status).toBe(200);
        noteId = createNoteResponse.data?.id;
        expect(noteId).toBeTruthy();
        await notesDashboardPage.navigateNotesDashboardPage();
      });

      await test.step("Search for notes", async () => {
        await notesDashboardPage.searchNotes(originalNote.title);
      });

      await test.step("Update note", async () => {
        await notesDashboardPage.selectEditButton();
        await modalsPage.fillAndSubmitNoteForm(
          updatedNote.title,
          updatedNote.description
        );
      });

      await test.step("Search for notes", async () => {
        await notesDashboardPage.searchNotes(updatedNote.title);
      });

      await test.step("Verify", async () => {
        await expect(
          notesDashboardPage.noteCardTitle(updatedNote.title)
        ).toBeVisible();
        await expect(
          notesDashboardPage.noteCardDescription(updatedNote.description)
        ).toBeVisible();
      });

      await test.step("Teardown", async () => {
        expect(noteId).toBeTruthy();
        if (noteId) {
          const deleteResponse = await notesClient.deleteNote(noteId);
          expect(deleteResponse.success).toBe(true);
          expect(deleteResponse.status).toBe(200);
        }
      });
    }
  );

  test(
    "Delete Note",
    { tag: ["@smoke", "@regression"] },
    async ({
      notesDashboardPage,
      modalsPage,
      notesClient,
      generateRandomText,
    }) => {
      const noteSuffix = generateRandomText(8);
      const noteData = {
        title: `deleteNoteTest-${noteSuffix}`,
        description: `deleteNoteDescriptionTest-${noteSuffix}`,
        category: "Personal",
      };

      let noteId: string | undefined;

      await test.step("Setup", async () => {
        const createNoteResponse = await notesClient.createNote(noteData);
        expect(createNoteResponse.success).toBe(true);
        expect(createNoteResponse.status).toBe(200);
        noteId = createNoteResponse.data?.id;
        expect(noteId).toBeTruthy();
        await notesDashboardPage.navigateNotesDashboardPage();
      });

      await test.step("Search for notes", async () => {
        await notesDashboardPage.searchNotes(noteData.title);
      });

      await test.step("Delete Note", async () => {
        await notesDashboardPage.selectDeleteButton();
        await modalsPage.selectDeleteButton();
      });

      await test.step("Verify", async () => {
        await expect(
          notesDashboardPage.noteCardTitle(noteData.title)
        ).toBeHidden();
      });
    }
  );

  test(
    "Search Notes",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage }) => {
      await test.step("Select tab", async () => {
        await notesDashboardPage.selectCategoryButton("Work");
      });

      await test.step("Search for notes", async () => {
        await notesDashboardPage.searchNotes("work1");
      });

      await test.step("Verify", async () => {
        await expect(notesDashboardPage.noteCardTitle("work1")).toBeVisible();
        await expect(notesDashboardPage.noteCardTitle("work2")).toBeHidden();
      });
    }
  );

  test(
    "Verify MyNotes navigation bar",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage }) => {
      await test.step("Verify navigation items", async () => {
        if (notesDashboardPage.isMobile) {
          await notesDashboardPage.selectNavigationMenuOnMobile();
        }

        await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
        await expect(
          notesDashboardPage.profileSettingsLinkButton
        ).toBeVisible();
        await expect(notesDashboardPage.logoutButton).toBeVisible();
      });
    }
  );

  test("No Notes Displayed", async ({ notesDashboardPage }) => {
    await test.step("Select tab", async () => {
      await notesDashboardPage.selectCategoryButton("Personal");
    });

    await test.step("Verify", async () => {
      await expect(
        notesDashboardPage.text("You don't have any notes in")
      ).toBeVisible();
    });
  });

  test(
    "'Add New Note' Modal",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage, modalsPage }) => {
      await test.step("View modal", async () => {
        await notesDashboardPage.selectAddNoteButton();
      });

      await test.step("Verify", async () => {
        await expect(modalsPage.modalHeading("Add new note")).toBeVisible();
        await expect(modalsPage.addNoteTitleInputBox).toBeVisible();
        await expect(modalsPage.submitButton).toBeVisible();
      });
    }
  );

  test(
    "'Edit Note' Modal",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage, modalsPage }) => {
      await test.step("Open modal", async () => {
        await notesDashboardPage.searchNotes("work2");
        await notesDashboardPage.selectEditButton();
      });

      await test.step("Verify", async () => {
        await expect(modalsPage.modalHeading("Edit note")).toBeVisible();
        await expect(modalsPage.addNoteTitleInputBox).toBeVisible();
        await expect(modalsPage.submitButton).toBeVisible();
      });
    }
  );

  test(
    "'Delete Note' Modal",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage, modalsPage }) => {
      await test.step("Open modal", async () => {
        await notesDashboardPage.searchNotes("work2");
        await notesDashboardPage.selectDeleteButton();
      });

      await test.step("Verify", async () => {
        await expect(modalsPage.modalHeading("Delete note?")).toBeVisible();
        await expect(modalsPage.deleteButton).toBeVisible();
        await expect(modalsPage.cancelButton).toBeVisible();
      });
    }
  );

  test(
    "Profile Page Navigation",
    { tag: ["@smoke", "@regression"] },
    async ({ notesDashboardPage, profileSettingsPage }) => {
      await test.step("Open profile settings", async () => {
        await notesDashboardPage.selectProfileSettingsButton();
      });

      await test.step("Verify", async () => {
        await expect(profileSettingsPage.pageHeading).toBeVisible();
      });
    }
  );

  test(
    "Visual Test",
    { tag: ["@visual", "@smoke", "@regression"] },
    async ({ notesDashboardPage }) => {
      const snapshotName = "notesDashboardPage_.png";
      const ratioAllowed = 0.03;

      await test.step("Perform visual comparison", async () => {
        await expect(notesDashboardPage.text("notes completed")).toBeVisible();
        expect(
          await notesDashboardPage.captureScreenshot({
            animations: "disabled",
            mask: [notesDashboardPage.testIdSelector("notes-list")],
          })
        ).toMatchSnapshot(snapshotName, { maxDiffPixelRatio: ratioAllowed });
      });
    }
  );
});
