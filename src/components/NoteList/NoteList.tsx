import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import type { HttpResponse } from "../types/note";

interface NoteListProps {
  arrayFoList: Note[];
  noteDel: (id: string)=>Promise<HttpResponse>;
};

export default function NoteList({ arrayFoList, noteDel }: NoteListProps) {
  return (
    <>
      <ul className={css.list}>
        {arrayFoList.map((el: Note) => (
          <li className={css.listItem}  key={el.id}>
            <h2 className={css.title}>{el.title}</h2>
            <p className={css.content}>{el.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{el.tag}</span>
              <button className={css.button} onClick={()=>noteDel(el.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
