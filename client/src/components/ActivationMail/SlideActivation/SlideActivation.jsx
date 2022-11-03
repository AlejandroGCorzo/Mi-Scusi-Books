import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ThemeProvider } from "@mui/material/styles";
import colorMiScusi from "../../Palettes/GreenColor.jsx";
import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideActivation() {
  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.push("/login")
  };
  return (
    <ThemeProvider theme={colorMiScusi}>
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Welcome to MiScusi Books !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your account has been activated. Thank you for joining us !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         {/*<Button onClick={handleClose}>Disagree</Button>*/}
          <Button onClick={handleClose}>Lets browse</Button>
        </DialogActions>
      </Dialog>
    </div>
   </ThemeProvider>
  );
}
