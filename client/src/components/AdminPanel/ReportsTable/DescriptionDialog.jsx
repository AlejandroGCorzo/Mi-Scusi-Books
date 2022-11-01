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
import { useEffect } from "react";
import { useState } from "react";

export default function DescriptionDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  let { description, openDialog, userName } = props;
  // openDialog, handleOpenDialog, handleCloseDialog,

  //const [openS, setOpenS] = React.useState(openDialog === 'click' ? true : false);
  //const [openDial, setOpenDial] = useState(true);
  //console.log(openDial);
  console.log(openDialog);


  //console.log(openS);
  //console.log(openDialog);
  //   const handleOpenDialog = () => {
  //     setOpenDialog(true);
  //   };

  const handleCloseDialog = () => {
    //setOpenDialog('');
    //setOpenDial(false)
    openDialog = false
  };

//   useEffect(() => {
//     setOpenDial(openDialog);
//     console.log(openDialog);
//   }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={ /* openDial */  openDialog }
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{`Report description from user: ${userName}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
