import css from "./App.module.css";
import { fetchNotes, deleteNote } from "../../services/noteService.ts";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import type { HttpResponse } from "../../types/note.ts";
import { useState } from "react";
import Pagination from "../Pagination/Pagination.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClients = useQueryClient();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<HttpResponse>({
    queryKey: ["noteQueryKey", currentPage],
    queryFn: () => fetchNotes(currentPage, 12),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: (idForDel: string) => deleteNote(idForDel),
    onSuccess: () => {
      queryClients.invalidateQueries({ queryKey: ["noteQueryKey"] });
    },
  });

  console.log(data);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {
            <Pagination
              totalPage={data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
          {<button className={css.button}  onClick={()=>openModal()} >Create note +</button>}
        </header>
      </div>

      {data && data.notes.length > 0 && (
        <NoteList arrayFoList={data.notes} noteDel={mutation.mutate} />
      )}

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </>
  );
}
