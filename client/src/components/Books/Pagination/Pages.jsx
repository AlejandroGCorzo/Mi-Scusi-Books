import { Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/StoreBooks/booksActions";




export default function Pages({count}){
 const dispatch = useDispatch()
 const { page } = useSelector(
  (state) => state.books
);
  function handleChange(e, page, selected){
    console.log('aca', page, selected)
    dispatch(setCurrentPage(page))
  }
 
  return(
    <Box>
      <Pagination 
      count={count}
      onChange={handleChange}
      page={page}
      />
    </Box>
  )
}