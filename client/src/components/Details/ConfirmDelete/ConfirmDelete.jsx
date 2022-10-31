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
import { getDetail } from '../../../redux/StoreBooks/booksActions';
import { useDispatch } from 'react-redux';

export default function ConfirmDelete({ openConfirm, setOpenConfirm, bookId, user, reviewId, rating, accessToken, setMsg, setOpen, userEmail}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  console.log('id', typeof reviewId, 'book', bookId, 'rating', rating)

  const handleConfirm = async() => {
    setLoading(true)
    try{
      const deletedReview = await axios.put(`/review/${reviewId}`, {bookId: bookId, rating: rating, userEmail: userEmail}, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      setMsg("Review deleted")
      dispatch(getDetail(bookId))
      
    } catch(e){
      setMsg("There was a problem. Try again later")
    }
    setLoading(false)
    setOpen(true)
    setOpenConfirm(false)
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
            {`Are you sure you want to remove "${user}'s" review?`}
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