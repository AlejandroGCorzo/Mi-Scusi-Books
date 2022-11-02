import React, { useState } from "react";
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import axios from "axios";
import { setEmptyLoggedUser } from "../../../redux/StoreUsers/usersSlice.js";

export default function DialogConfirmEdit({
  open,
  setOpen,
  id,
  email,
  history,
  token,
  dispatch,
}) {
  const [confirmPass, setConfirmPass] = useState({});
  function handleConfirm() {
    // setOpen(false);
    // console.log(email, id);
    if (email !== confirmPass.value)
      return setConfirmPass({ ...confirmPass, error: "Wrong email." });
    else
      axios
        .put(
          `/user/delete/${id}`,
          {},
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((e) => {
          dispatch(setEmptyLoggedUser());
          window.localStorage.removeItem("token");
          window.sessionStorage.removeItem("token");
          history.push("/");
        })
        .catch((e) => console.log(e));
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm your email to continue.
          </DialogContentText>
        </DialogContent>
        <TextField
          sx={{ m: 0.8 }}
          label="Confirm email"
          onFocus={(e) => e.target.select()}
          onChange={(e) => setConfirmPass({ value: e.target.value })}
          inputProps={{ maxLength: 33 }}
          error={confirmPass.error ? true : false}
          helperText={confirmPass.error ? `${confirmPass.error}` : null}
        />
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
