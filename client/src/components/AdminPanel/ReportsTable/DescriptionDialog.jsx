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
import { snackBookDelete } from "../../../redux/StoreSnackbar/snackActions";

export default function DescriptionDialog(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { description, userName, setOpenDialog, openDialog } =
    props;
    // openDialog, handleOpenDialog, handleCloseDialog,

    const [openS, setOpenS] = React.useState(openDialog === 'click' ? true : false);

    //console.log(openS);
    //console.log(openDialog);
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog('');
    };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={ openS /* openDialog */}
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{`Report description from user: ${userName}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
            {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
