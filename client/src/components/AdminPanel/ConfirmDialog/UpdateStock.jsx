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
import { snackBookStock } from "../../../redux/StoreSnackbar/snackActions";

export default function UpdateStock(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { openDialog, handleClose, id, handleSetStock, numSelected, stock } = props;
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleUpdateStock = (e) => {
    handleSetStock()
    handleClose();
    dispatch(snackBookStock(true))
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Add stock"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add {stock} units to {numSelected}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => handleUpdateStock(e)}>
          CONFIRM
        </Button>
        <Button onClick={(e) => handleClose(e)} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
