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
import Button from "@mui/material/Button";
import UsersDelete from "../ConfirmDialog/UsersDelete";
import UsersBlock from "../ConfirmDialog/UsersBlock";
import { useDispatch } from "react-redux";
import { setUserChangeRol } from "../../../redux/StoreUsers/usersActions";

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
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "dni",
    numeric: false,
    disablePadding: true,
    label: "DNI",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "street",
    numeric: false,
    disablePadding: true,
    label: "Street",
  },
  {
    id: "number",
    numeric: false,
    disablePadding: true,
    label: "Number",
  },
  {
    id: "floor",
    numeric: false,
    disablePadding: true,
    label: "Floor",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Rol",
  },
];

// Table Head -> titulares
function EnhancedTableHead(props) {
  const { order, orderBy, emailSelectUser, rowCount, onRequestSort } = props;
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

// ToolBar
const EnhancedTableToolbar = (props) => {
  const {
    emailSelectUser, // email del usuario seleccionado
    id, // id del usuario seleccionado
    selectUser, // objeto del usuario seleccionado
    loggedUser, // objeto del usuario loggeado
    openDelete, // state para abrir o cerrar el dialog
    handleOpenDelete, // fn para abrir el dialog
    handleCloseDelete, // fn para cerrar el dialog
    handleMakeAdmin, // fn para hacer admin
    handleRemoveAdmin, // fn para remover admin
    openBlock, // state para abrir o cerrar block dialog
    handleOpenBlock, // fn para abrir dialog
    handleCloseBlock, // fn para cerrar dialog
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(emailSelectUser > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {emailSelectUser && id !== loggedUser.id ? (
        <>
          <>
            {selectUser.type !== "admin" ? (
              <Button
                onClick={(e) => handleMakeAdmin(e)}
                variant="outlined"
                style={{ "min-width": "122px" }}
              >
                Change rol
              </Button>
            ) : (
              <Button
                onClick={(e) => handleRemoveAdmin(e)}
                variant="outlined"
                style={{ "min-width": "140px" }}
              >
                Remove admin
              </Button>
            )}
          </>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {emailSelectUser ? `User: ${emailSelectUser}` : null}
          </Typography>
          <IconButton onClick={(e) => handleOpenDelete(e)} title="Delete">
            <DeleteIcon />
          </IconButton>
          <UsersDelete
            emailSelectUser={emailSelectUser}
            openDialog={openDelete}
            handleClose={handleCloseDelete}
            id={id}
          />
          <>
            <IconButton onClick={e=>handleOpenBlock(e)} title="Block">
              <BlockIcon />
            </IconButton>
            <UsersBlock
              emailSelectUser={emailSelectUser}
              openBlock={openBlock}
              handleCloseBlock={handleCloseBlock}
              id={id}
              //openDialog={openBlock}
              //handleClose={handleCloseblock}
            />
          </>
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
  
  const { users } = useSelector((state) => state.users);
  const { loggedUser } = useSelector((state) => state.users);
  console.log(selected);
  
  //////////////Make and remove admin//////////////////
  const dispatch = useDispatch();
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleMakeAdmin = (e)=>{
    // alert("Make Admin")
    dispatch(setUserChangeRol(selected, 'admin', accessToken))
  };
  
  const handleRemoveAdmin = (e)=>{
    //alert("Remove Admin")
    dispatch(setUserChangeRol(selected, 'normal', accessToken))
  };
  
  //////////////Open and close confirm dialog//////////////////
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = (e) => {
    // e.stopPropagation()
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelected();
    setShowEmail();
  };

  //////////////Open and close block confirm dialog//////////////////
  const [openBlock, setOpenBlock] = React.useState(false);
  const handleOpenBlock = (e) => {
    // e.stopPropagation()
    setOpenBlock(true);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
    setSelected();
    setShowEmail();
  };


  /////////////Pide la function de sort de mas arriba//////////////
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /////////Set 'selected' con el id y email seleccionado//////////
  const handleClick = (e, id, email) => {
    //e.stopPropagation()
    id === selected ? setSelected() : setSelected(id);
    email === showEmail ? setShowEmail() : setShowEmail(email);
  };
  
  //////Functions para cambiar paginas y elementos por pagina//////
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => id === selected;// Devuelve true o false -> completa el checkbox

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          emailSelectUser={showEmail /* .length */}
          openDelete={openDelete}
          handleOpenDelete={handleOpenDelete}
          handleCloseDelete={handleCloseDelete}
          id={selected}
          selectUser={users.find((u) => u._id === selected)}
          loggedUser={loggedUser}
          handleMakeAdmin={handleMakeAdmin}
          handleRemoveAdmin={handleRemoveAdmin}
          openBlock={openBlock}
          handleOpenBlock={handleOpenBlock}
          handleCloseBlock={handleCloseBlock}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              emailSelectUser={selected /* .length */}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((u, index) => {
                  const isItemSelected = isSelected(u._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(e) => handleClick(e, u._id, u.email)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={u._id}
                      selected={isItemSelected}
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
                        {u.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ "text-transform": "capitalize" }}
                      >
                        {u.firstName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ "text-transform": "capitalize" }}
                      >
                        {u.lastName}
                      </TableCell>
                      <TableCell align="left">{u.dni}</TableCell>
                      <TableCell align="left">{u.phone}</TableCell>
                      <TableCell
                        align="left"
                        style={{ "text-transform": "capitalize" }}
                      >
                        {u.address.street}
                      </TableCell>
                      <TableCell align="left">{u.address.number}</TableCell>
                      <TableCell align="left">{u.address.floor}</TableCell>
                      <TableCell
                        align="left"
                        style={{ "text-transform": "capitalize" }}
                      >
                        {u.type}
                      </TableCell>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
