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
import { setUserDelete } from "../../../redux/StoreUsers/usersActions";
import { snackUserActive } from "../../../redux/StoreSnackbar/snackActions";

export default function UsersActive(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { emailSelectUser, openActive, handleCloseActive, id } = props;

  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleBlock = (e) => {
    dispatch(setUserDelete(id, "active", accessToken));
    dispatch(handleCloseActive);
    dispatch(snackUserActive(true))
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openActive}
      onClose={handleCloseActive}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Active User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to active user {emailSelectUser} please click CONFIRM,
          otherwise click CANCEL.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => handleBlock(e)}>
          CONFIRM
        </Button>
        <Button onClick={handleCloseActive} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
