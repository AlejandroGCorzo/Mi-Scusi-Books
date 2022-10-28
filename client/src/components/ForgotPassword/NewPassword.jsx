import React from "react";
import "./NewPassword.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putNewPassword } from "../../redux/StoreUsers/usersActions";
import { TextField, Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { validations } from "../AccountCreate/Functions/validations";

export default function NewPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { changePassword } = useSelector((state) => state.users);
  const msg = changePassword
  useEffect(() => {
    if (changePassword) {
      history.push("/login");
    };
    return () => {
      dispatch(putNewPassword(""));
    };
  }, [dispatch]);

  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const token = params.get("reset");

  const [input, setInput] = useState({
    newPassword: "",
  });
  const [error, setError] = useState({
    newPassword: "",
  });
  const [open, setOpen] = useState(false);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validate({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function validate({ newPassword, confirmNewPassword }) {
    let errors = {};
    //NewPassword

    if (!newPassword) errors.newPassword = "Please complete all fields";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword)
    )
      errors.newPassword =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.";
    else if (newPassword !== confirmNewPassword)
      errors.newPassword = "Passwords must be the same.";
    else delete errors.newPassword;

    setError(errors);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putNewPassword(input.newPassword, token));
    setTimeout(()=>setOpen(true),500)
    setTimeout(()=>history.push('/login'),2500)
  };

  function handleClose() {
    setOpen(false);
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{ width: "50px" }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="containerNewPassword">
      <div className="boxNewPassword">
        <div className="tittleNewPassword">
          <h3>Change your password</h3>
        </div>
        <div className="textFieldNewPassword">
          <TextField
            sx={{ m: 0.5 }}
            label="New password*"
            autoComplete="off"
            name="newPassword"
            className="newPassword"
            type="text"
            placeholder="New password"
            inputProps={{ maxLength: 40 }}
            value={input.newPassword}
            onChange={(e) => handleInput(e)}
          />
          {/* {error.newPassword?.length > 0 ? <p>{error.newPassword}</p> : <></>} */}
        </div>
        <div className="textFieldNewPassword">
          <TextField
            sx={{ m: 0.5 }}
            label="Confirm new password*"
            autoComplete="off"
            name="confirmNewPassword"
            className="newPassword"
            type="text"
            placeholder="Confirm new password"
            inputProps={{ maxLength: 40 }}
            value={input.confirmNewPassword}
            onChange={(e) => handleInput(e)}
          />
          {error.newPassword?.length > 0 ? <p>{error.newPassword}</p> : <></>}
        </div>
        {error.confirm?.length > 0 ? <p>{error.confirm}</p> : <></>}
        <div className="newPasswordButton">
          <Button
            disabled={!input.newPassword || error.newPassword ? true : false}
            variant="outlined"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Redirecting...'
        action={action}
      />
    </div>
  );
}
