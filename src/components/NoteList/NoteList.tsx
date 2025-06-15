import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import { deleteNote } from "../../services/noteService.ts";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClients = useQueryClient();

  const mutationDel = useMutation({
    mutationFn: (idForDel: number) => deleteNote(idForDel),
    onSuccess: () => {
      queryClients.invalidateQueries({ queryKey: ["noteQueryKey"] });
    },
  });

  return (
    <>
      {mutationDel.isPending && <div>Delete note...</div>}
      {mutationDel.isError && <div>An error occurred, please try again</div>}
      <ul className={css.list}>
        {notes.map((el: Note) => (
          <li className={css.listItem} key={el.id}>
            <h2 className={css.title}>{el.title}</h2>
            <p className={css.content}>{el.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{el.tag}</span>
              <button className={css.button} onClick={() => mutationDel.mutate(el.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
