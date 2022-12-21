import { FC } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  count: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  count,
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(count / 4)}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
