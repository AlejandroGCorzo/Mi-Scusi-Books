import React from "react";
import "./NewPassword.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putNewPassword } from "../../redux/StoreUsers/usersActions";
import { TextField, Button, Snackbar, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { validations } from "../AccountCreate/Functions/validations";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function NewPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { changePassword } = useSelector((state) => state.users);
  const msg = changePassword;

  const querystring = window.location.search;
  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const token = params.get("reset");

  const [input, setInput] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });
  const [error, setError] = useState({
    newPassword: "",
  });
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState({
    password: false,
    confirmPass: false,
  });
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
    setLoading(true)
    setTimeout(()=>dispatch(putNewPassword(input.newPassword, token)), 1000)
    setTimeout(() => setOpen(true), 2000);
    setTimeout(() => history.push("/login"), 4000);
  };

  function handleClose() {
    setOpen(false);
  }

  const handleClickShowPassword = (name) => {
    console.log(name);
    setShow({
      ...show,
      [name]: !show[name],
    });
  };

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

  useEffect(() => {
    return () => {
      dispatch(putNewPassword(""));
    };
  }, [dispatch]);
  return (
    <div className="containerNewPassword">
      <div className="boxNewPassword">
        <div className="tittleNewPassword">
          <h3>Change your password</h3>
        </div>
        <FormControl sx={{ m: 0.5 }} variant="outlined" className="textfield">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={error.newPassword ? true : false}
          >
            New Password*
          </InputLabel>
          <OutlinedInput
            id="passwordInput"
            label="New Password*"
            type={show.password ? "text" : "password"}
            value={input.newPassword}
            placeholder="New Password"
            name="newPassword"
            onChange={handleInput}
            autoComplete="off"
            error={error.newPassword ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    bgcolor: "white",
                    ":hover": { bgcolor: "#287ccb" },
                  }}
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("password")}
                  edge="end"
                >
                  {show.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error.newPassword ? (
            <FormHelperText error>{error.newPassword}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ m: 0.5 }} variant="outlined" className="textfield">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={error.newPassword ? true : false}
          >
            Confirm Password*
          </InputLabel>
          <OutlinedInput
            id="passwordInput"
            label="Confirm New Password*"
            type={show.confirmPass ? "text" : "password"}
            value={input.confirmNewPassword}
            placeholder="Confirm Password"
            name="confirmNewPassword"
            onChange={handleInput}
            autoComplete="off"
            error={error.newPassword ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    bgcolor: "white",
                    ":hover": { bgcolor: "#287ccb" },
                  }}
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("confirmPass")}
                  edge="end"
                >
                  {show.confirmPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error.newPassword ? (
            <FormHelperText error>{error.newPassword}</FormHelperText>
          ) : null}
        </FormControl>
        {error.confirm?.length > 0 ? <p>{error.newPassword}</p> : <></>}
        <div className="loadingNewPassword">
        {loading? changePassword? <p style={{ color: "blue" }}>{changePassword}</p> : <CircularProgress/> : <></>}
        </div>
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
        message="Redirecting..."
        action={action}
      />
    </div>
  );
}
