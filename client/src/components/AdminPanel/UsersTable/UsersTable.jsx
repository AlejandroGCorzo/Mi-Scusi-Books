import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function UsersTable() {
  const { users } = useSelector((state) => state.users);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Birthday</TableCell>

            <TableCell align="right">Street</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Floor</TableCell>

            <TableCell align="right">State</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow
              key={u._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {u.email}
              </TableCell>
              <TableCell align="right">{u.firstName}</TableCell>
              <TableCell align="right">{u.lastName}</TableCell>
              <TableCell align="right">{u.dni}</TableCell>
              <TableCell align="right">{u.phone}</TableCell>
              <TableCell align="right">{u.birthdate}</TableCell>
              <TableCell align="right">{u.address.street}</TableCell>
              <TableCell align="right">{u.address.number}</TableCell>
              <TableCell align="right">{u.address.floor}</TableCell>
              <TableCell align="right">{u.state}</TableCell>
              <TableCell align="right">{u.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
