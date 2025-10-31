import { NotesClient } from "../../../api/clients/notes.client";

type GenerateRandomText = (length?: number) => string;

export type SeededNote = {
  id: string;
  title: string;
};

type SeedDashboardNotesParams = {
  notesClient: NotesClient;
  generateRandomText: GenerateRandomText;
  count?: number;
  category?: "Work" | "Home" | "Personal";
  titlePrefix?: string;
  descriptionPrefix?: string;
};

/**
 * Creates deterministic notes for dashboard scenarios so UI tests can rely on them.
 * Throws if any note fails to create.
 */
export async function seedDashboardNotes({
  notesClient,
  generateRandomText,
  count = 2,
  category = "Work",
  titlePrefix = "search-note",
  descriptionPrefix = "search note seed",
}: SeedDashboardNotesParams): Promise<SeededNote[]> {
  const payloads = Array.from({ length: count }, (_, index) => {
    const suffix = generateRandomText(6);
    const label = index + 1;
    return {
      title: `${titlePrefix}-${label}-${suffix}`,
      description: `${descriptionPrefix} ${label} - ${suffix}`,
      category,
    };
  });

  const created: SeededNote[] = [];
  for (const payload of payloads) {
    const response = await notesClient.createNote(payload);
    if (!response.success || !response.data?.id) {
      throw new Error(
        `Unable to seed note "${payload.title}" (status: ${response.status})`
      );
    }
    created.push({ id: response.data.id, title: payload.title });
  }

  return created;
}
