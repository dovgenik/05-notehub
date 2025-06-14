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
import SearchBox from "../SearchBox/SearchBox.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  
  const queryClients = useQueryClient();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<HttpResponse>({
    queryKey: ["noteQueryKey", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, 12, searchQuery),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const mutationDel = useMutation({
    mutationFn: (idForDel: string) => deleteNote(idForDel),
    onSuccess: () => {
      queryClients.invalidateQueries({ queryKey: ["noteQueryKey"] });
    },
  });


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox   setState = {setSearchQuery}/>}
          {
            <Pagination
              totalPage={data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
          {
            <button className={css.button} onClick={() => openModal()}>
              Create note +
            </button>
          }
        </header>
      </div>

      {data && data.notes.length > 0 && (
        <NoteList arrayFoList={data.notes} noteDel={mutationDel.mutate} />
      )}
      {mutationDel.isPending && <div>Delite note...</div>}
      {mutationDel.isError && <div>An error delited</div>}
      

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </>
  );
}
