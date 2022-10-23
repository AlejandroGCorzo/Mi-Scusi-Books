import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { snackBookDelete } from "../../../redux/StoreSnackbar/snackActions";
import Alert from "@mui/material/Alert";

export default function SnackDeleteBook() {
  const handleClick = () => {
    dispatch(snackBookDelete(true));
  };

  const handleClose = () => {
    dispatch(snackBookDelete(false));
  };

  const dispatch = useDispatch();
  const { bookDelete } = useSelector((state) => state.snack);

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
      <Button onClick={(e) => handleClick(e)}>Changes Saved!</Button>
      <Snackbar
        open={bookDelete}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Changes Saved!!"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Book deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}

