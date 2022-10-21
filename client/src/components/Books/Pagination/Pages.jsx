import { Box, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/StoreBooks/booksActions";

export default function Pages({ count }) {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.books);
  function onRowsChange(e) {
    const rows = parseInt(e.target.value, 10);
    dispatch(setCurrentPage({ ...page, rows: rows }));
  }
  function onPageChange(e, newPage) {
    dispatch(setCurrentPage({ ...page, currentPage: newPage }));
  }
  return (
    <Box>
      <TablePagination
        count={count}
        page={page.currentPage}
        onPageChange={onPageChange}
        rowsPerPage={page.rows}
        onRowsPerPageChange={onRowsChange}
      />
    </Box>
  );
}
