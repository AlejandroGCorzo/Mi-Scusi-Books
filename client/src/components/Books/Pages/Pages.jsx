import { Box, TablePagination } from "@mui/material";
import { lineHeight } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/StoreBooks/booksActions";

export default function Pages({ count }) {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.books);
  function onRowsChange(e) {
    const rows = parseInt(e.target.value, 10);
    dispatch(setCurrentPage({ ...page, currentPage: 0, rows: rows }));
  }
  function onPageChange(e, newPage) {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage({ ...page, currentPage: newPage }));
  }
  return (
    <Box>
      <TablePagination
        count={count}
        page={page.currentPage}
        onPageChange={onPageChange}
        rowsPerPageOptions={[25, 50, 100]}
        rowsPerPage={page.rows}
        onRowsPerPageChange={onRowsChange}
        labelRowsPerPage={"Books per page"}
        sx={{
          ".MuiTablePagination-selectLabel": {
            fontSize: "1rem",
            marginTop: "12px",
            lineHeight: 1.5,
          },
          "	.MuiTablePagination-displayedRows": {
            marginTop: "12px",
          },
        }}
      />
    </Box>
  );
}
