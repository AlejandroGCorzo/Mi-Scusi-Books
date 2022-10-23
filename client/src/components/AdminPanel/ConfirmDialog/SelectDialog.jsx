import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setUserChangeRol } from "../../../redux/StoreUsers/usersActions";
import { snackbarChange } from "../../../redux/StoreSnackbar/snackActions";


export default function SelectDialog(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { openDialog, handleCloseDialog, emailSelectUser, id, newRol } = props;
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleChangeRol = (e) => {
    dispatch(setUserChangeRol(id, newRol, accessToken));
    handleCloseDialog();
    dispatch(snackbarChange(true))
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Change user rol"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to make user {emailSelectUser} {newRol} please click
          CONFIRM, otherwise click CANCEL.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => handleChangeRol(e)}>
          CONFIRM
        </Button>
        <Button onClick={handleCloseDialog} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
