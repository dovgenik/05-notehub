import axios from "axios";

import type { HttpResponse, AddNote } from "../types/note";

export async function fetchNotes(page: number,perPage: number, search: string | null): Promise<HttpResponse> {
  return (
    await axios.get<HttpResponse>(
      `https://notehub-public.goit.study/api/notes`,
      {
        params: {
          search: search,
          page: page,
          perPage: perPage,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
          accept: "application/json",
        },
      }
    )
  ).data;
}

export async function deleteNote(idNote: string) {
  return ( await axios.delete<HttpResponse>(
    `https://notehub-public.goit.study/api/notes/${idNote}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  )).data;
}

export async function createNote(newNote: AddNote) {


return ( await axios.post<HttpResponse>(
    `https://notehub-public.goit.study/api/notes`, newNote,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  )).data;

}

