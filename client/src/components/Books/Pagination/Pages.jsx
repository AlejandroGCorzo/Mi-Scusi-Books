import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";


export default function Pages({ count, setBooksToShow, setPagination }) {
  // const [pagination, setPagination] = useState({
  //   from: 0,
  //   to: pageSize
  // })
  // const count = Math.ceil(books.length / pageSize)
  // const toShow = books.slice(pagination.from, pagination.to)


export default function Pages({count}){
 const dispatch = useDispatch()
 const { page } = useSelector(
  (state) => state.books
);
  function handleChange(e, page, selected){
    console.log('aca', page, selected)
    dispatch(setCurrentPage(page))
  }

  return (
    <Box>
      <Pagination 
      count={count}
      onChange={handleChange}
      page={page}
      />
    </Box>
  );
}
