import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { setBookDelete } from "../../../redux/StoreBooks/booksActions";

export default function UsersDelete(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { numSelected, openDialog, handleClose, id } = props;

  console.log(id);

  const handleDelete = (e) => {
    dispatch(setBookDelete(id));
    dispatch(handleClose);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Delete Book"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to delete book {numSelected} please click CONFIRM,
          otherwise click CANCEL.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          CANCEL
        </Button>
        <Button onClick={(e) => handleDelete(e)} autoFocus>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}
