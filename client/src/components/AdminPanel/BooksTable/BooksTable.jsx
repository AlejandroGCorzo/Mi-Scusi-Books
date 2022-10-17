import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BooksTable() {
  const { books } = useSelector((state) => state.books);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Editorial</TableCell>
            <TableCell align="right">Theme</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Sub Category</TableCell>
            <TableCell align="right">Format</TableCell>
            <TableCell align="right">Edition</TableCell>
            <TableCell align="right">Language</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow
              key={b._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {b.name}
              </TableCell>
              <TableCell align="right">{b.author}</TableCell>
              <TableCell align="right">{b.editorial}</TableCell>
              <TableCell align="right">{b.category[0]}</TableCell>
              <TableCell align="right">{b.category[1]}</TableCell>
              <TableCell align="right">{b.category[2]}</TableCell>
              <TableCell align="right">{b.format}</TableCell>
              <TableCell align="right">{b.edition}</TableCell>
              <TableCell align="right">{b.language}</TableCell>
              <TableCell align="right">{b.ISBN}</TableCell>
              <TableCell align="right">{b.rating}</TableCell>
              <TableCell align="right">{b.stock}</TableCell>
              <TableCell align="right">${b.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
