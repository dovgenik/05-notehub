import axios from "axios";

import type { AddNote, Note } from "../types/note";


export interface HttpResponse {
  notes: Note[];
  totalPages: number;
};


export async function fetchNotes(page: number, search: string | null): Promise<HttpResponse> {
 
  return (                            
    await axios.get<HttpResponse>(
      `https://notehub-public.goit.study/api/notes`,
      {
        params: {
          search: search,
          page: page,
          perPage: null,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
          accept: "application/json",
        },
      }
    )
  ).data;
}

export async function deleteNote(idNote: number): Promise<Note> {
  return ( await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${idNote}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  )).data;
}

export async function createNote(newNote: AddNote): Promise<Note> {


return ( await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`, newNote,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  )).data;

}

