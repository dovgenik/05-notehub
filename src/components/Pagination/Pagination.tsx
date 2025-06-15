import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
 

interface PaginationProps  {
    totalPage: number;
    currentPage: number;
    setCurrentPage: (a: number)=>(void)

}


export default function Pagination({totalPage, currentPage, setCurrentPage}: PaginationProps) {
 
  return (
    <>
    {totalPage>1 && <ReactPaginate
          pageCount={totalPage}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={(selectedItam) =>
            setCurrentPage(selectedItam.selected + 1)
          }
          forcePage={currentPage - 1}
          breakLabel="..."
          nextLabel=" >"
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName={css.pagination}
          activeClassName={css.active}
        />}
        
    </>
  );
}