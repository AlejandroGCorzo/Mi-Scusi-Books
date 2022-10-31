import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import handleUpdate from "../Functions/handleUpdate";

export default function DialogAction({
  handleClose,
  newBook,
  setNewBook,
  emptyBook,
  handleSubmit,
  setAuthor,
  setOptions,
  defaultOptions,
  setCatSel,
  open,
  history,
  bookId,
  accessToken
}) {
  return (
    <React.Fragment>
      {/*  */}
      <Dialog
        open={open.reset ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reset all fields?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setNewBook(emptyBook);
              setAuthor("");
              setOptions(defaultOptions);
              setCatSel("Select Theme");
            }}
            autoFocus
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      {/*  */}
      {/*  */}
      <Dialog
        open={open.create ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm creation of {newBook.title}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Check that everything is OK and click Confirm. Else click Cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              handleClose();
              handleSubmit(e, newBook, history);
            }}
            autoFocus
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      {/*  */}
      {/*  */}
      <Dialog
        open={open.update ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm update
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Check that everything is OK and click Confirm. Else click Cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              handleClose();
              handleUpdate(e, newBook, history, bookId, accessToken);
            }}
            autoFocus
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
