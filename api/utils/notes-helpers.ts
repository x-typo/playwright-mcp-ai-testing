import { NotesClient } from "../clients/notes.client";
import { Note } from "../models/notes.models";

export function getNoteIdByTitle(notes: Note[], title: string): string | null {
  const foundNote = notes.find((n) => n.title === title);
  return foundNote ? foundNote.id : null;
}

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

  return Promise.all(
    payloads.map(async (payload) => {
      const response = await notesClient.createNote(payload);
      if (!response.success || !response.data?.id) {
        throw new Error(
          `Unable to seed note "${payload.title}" (status: ${response.status})`
        );
      }
      return { id: response.data.id, title: payload.title };
    })
  );
}
