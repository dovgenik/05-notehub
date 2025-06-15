import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService.ts";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import { useState } from "react";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import Loader from "../Loader/Loader.tsx";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["noteQueryKey", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    enabled: true,
    placeholderData: keepPreviousData,
  });

 const noteSearch = useDebouncedCallback(
  (value: string | null) => {
    setSearchQuery(value);
    setCurrentPage(1);
  },
  1000
);



  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox setState={noteSearch} />}
          {
            <Pagination
              totalPage={data?.totalPages ?? 0}
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

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </>
  );
}
