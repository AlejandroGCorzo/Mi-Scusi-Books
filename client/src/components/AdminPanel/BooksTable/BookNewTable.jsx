import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import BlockIcon from "@mui/icons-material/Block";
import { useSelector } from "react-redux";

import BooksDelete from "../ConfirmDialog/BooksDelete.jsx"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "author",
    numeric: false,
    disablePadding: true,
    label: "Author",
  },
  {
    id: "format",
    numeric: false,
    disablePadding: true,
    label: "Format",
  },
  {
    id: "edition",
    numeric: false,
    disablePadding: true,
    label: "Edition",
  },
  {
    id: "language",
    numeric: false,
    disablePadding: true,
    label: "Language",
  },
  {
    id: "ISBN",
    numeric: false,
    disablePadding: true,
    label: "ISBN",
  },
  {
    id: "rating",
    numeric: false,
    disablePadding: true,
    label: "Rating",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: true,
    label: "Stock",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: true,
    label: "Price",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected, openDelete, handleOpenDelete, handleCloseDelete, id } =
    props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
          style={{'text-transform': 'capitalize'}}
        >
          {numSelected ? `Book: ${numSelected}` : null}
        </Typography>
      }
      {numSelected ? (
        <>
          <>
            <IconButton onClick={handleOpenDelete} title="Delete">
              <DeleteIcon />
            </IconButton>
            <BooksDelete
              numSelected={numSelected}
              openDialog={openDelete}
              handleClose={handleCloseDelete}
              id={id}
            />
          </>
          {/* <>
            <IconButton onClick={handleOpenBlock} title="Block">
              <BlockIcon />
            </IconButton>
            <UsersBlock
              numSelected={numSelected}
              openDialog={openBlock}
              handleClose={handleCloseblock}
            />
          </> */}
        </>
      ) : null}
    </Toolbar>
  );
};

export default function TestUsers() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("email");
  const [selected, setSelected] = React.useState();
  const [showEmail, setShowEmail] = React.useState();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  console.log(selected);

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelected();
    setShowEmail()
  };

  const { books } = useSelector((state) => state.books);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id, name) => {
    id === selected ? setSelected() : setSelected(id);
    name === showEmail ? setShowEmail() : setShowEmail(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => id === selected;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={showEmail /* .length */}
          openDelete={openDelete}
          handleOpenDelete={handleOpenDelete}
          handleCloseDelete={handleCloseDelete}
          id={selected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected /* .length */}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={books.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(books, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((b, index) => {
                  const isItemSelected = isSelected(b._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, b._id, b.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={b._id}
                      selected={isItemSelected}
                      style={{'text-transform': 'capitalize'}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {b.name}
                      </TableCell>
                      <TableCell align="left">{b.author}</TableCell>
                      <TableCell align="left">{b.format}</TableCell>
                      <TableCell align="left">{b.edition}</TableCell>
                      <TableCell align="left">{b.language}</TableCell>
                      <TableCell align="left">{b.ISBN}</TableCell>
                      <TableCell align="left">{b.rating}</TableCell>
                      <TableCell align="left">{b.stock}</TableCell>
                      <TableCell align="left">{b.price}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}