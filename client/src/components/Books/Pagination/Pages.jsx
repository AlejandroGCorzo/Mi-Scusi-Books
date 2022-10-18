import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const pageSize = 8;

export default function Pages({ count, setBooksToShow, setPagination }) {
  // const [pagination, setPagination] = useState({
  //   from: 0,
  //   to: pageSize
  // })
  // const count = Math.ceil(books.length / pageSize)
  // const toShow = books.slice(pagination.from, pagination.to)

  // console.log('toShow', toShow)

  function handleChange(e, page) {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ from: from, to: to });
  }

  return (
    <Box>
      <Pagination count={count} onChange={handleChange} />
    </Box>
  );
}
