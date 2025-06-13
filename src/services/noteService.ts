// Типізуйте їх параметри, результат, який вони повертають, та відповідь від Axios.
// У вас мають бути наступні функції:

// fetchNotes : має виконувати запит для отримання колекції нотатків із сервера.
// Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);

// createNote: має виконувати запит для створення нової нотатки на сервері.
// Приймає вміст нової нотатки та повертає створену нотатку у відповіді;

// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором.
// Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.

// Інтерфейси, які описують відповіді http-запитів (FetchNotesResponse і т.д.) та параметри функцій,
// які виконують http-запити у — src/services/noteService.ts.

import axios from "axios";

import type { HttpResponse, AddNote } from "../types/note";

export async function fetchNotes(page: number,perPage: number): Promise<HttpResponse> {
  return (
    await axios.get<HttpResponse>(
      `https://notehub-public.goit.study/api/notes`,
      {
        params: {
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

