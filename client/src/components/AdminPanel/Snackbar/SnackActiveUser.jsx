import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { snackUserActive } from "../../../redux/StoreSnackbar/snackActions";
import Alert from "@mui/material/Alert";

export default function SnackActive() {

  const handleClose = () => {
    dispatch(snackUserActive(false));
  };

  const dispatch = useDispatch();
  const { userActive } = useSelector((state) => state.snack);

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
        open={userActive}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Changes Saved!!"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User active!
        </Alert>
      </Snackbar>
    </div>
  );
}

