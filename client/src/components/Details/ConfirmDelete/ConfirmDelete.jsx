import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ConfirmDelete({ openConfirm, setOpenConfirm, bookName, bookId, accessToken, setMsg, setOpen}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = React.useState(false)
  const history = useHistory();

  const handleConfirm = async() => {
    setLoading(true)
    try{
      const deletedBook = await axios.put(`/books/delete/${bookId}`, {}, {
        headers:{
          authorization: `Bearer ${accessToken}`
        }
      })
      setMsg("Book deleted")
    } catch(e){
      setMsg("There was a problem. Try again later")
    }
    setLoading(false)
    setOpen(true)
    setOpenConfirm(false)
    setTimeout(() => history.push("/"), 2000)
    
  };

  const handleClose = () => {
    setLoading(false)
    setOpenConfirm(false)  
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm book removal"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to remove "${bookName?.toUpperCase()}" from the list of books ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton 
            loading={loading}
            variant="outlined"
            onClick={handleConfirm}
          >
            Confirm
          </LoadingButton>
          {/* <Button onClick={handleClose} autoFocus>
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}