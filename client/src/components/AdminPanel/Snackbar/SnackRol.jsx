import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { snackbarChange } from "../../../redux/StoreSnackbar/snackActions";
import Alert from "@mui/material/Alert";

export default function SnackRol() {

  const handleClose = () => {
    dispatch(snackbarChange(false));
  };

  const dispatch = useDispatch();
  const { userRol } = useSelector((state) => state.snack);

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={(e) => handleClose(e)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={userRol}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Changes Saved!!"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Rol changed succesfuly!
        </Alert>
      </Snackbar>
    </div>
  );
}
