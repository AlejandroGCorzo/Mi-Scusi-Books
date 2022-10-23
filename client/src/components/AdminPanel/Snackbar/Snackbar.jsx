import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { snackbarChange } from "../../../redux/StoreUsers/usersActions";

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    //setOpen(true);
    dispatch(snackbarChange(true));
  };

  const handleClose = () => {
    //setOpen(false);
    dispatch(snackbarChange(false));
  };

  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.users);

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
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Changes Saved!!"
        action={action}
      />
    </div>
  );
}
