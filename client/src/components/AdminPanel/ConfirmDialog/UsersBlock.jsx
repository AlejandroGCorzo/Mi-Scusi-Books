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
import { snackUserBlock } from "../../../redux/StoreSnackbar/snackActions";

export default function UsersBlock(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { emailSelectUser, openBlock, handleCloseBlock, id } = props;

  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleBlock = (e) => {
    dispatch(setUserDelete(id, "limited", accessToken));
    dispatch(handleCloseBlock);
    dispatch(snackUserBlock(true))
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openBlock}
      onClose={handleCloseBlock}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Block User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to block user {emailSelectUser} please click CONFIRM,
          otherwise click CANCEL.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={(e) => handleBlock(e)}>
          CONFIRM
        </Button>
        <Button onClick={handleCloseBlock} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
