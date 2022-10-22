import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserAccountCreate.css";
import axios from "axios";
import { loging } from "../../redux/StoreUsers/usersActions";
// // // // // // // // // // // // // // // MUI IMPORT
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AccountCreate() {
  // // // // // // // // //
  const dispatch = useDispatch();
  const history = useHistory();
  // // // // // // // // //
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  // // // // // // // // // ON CHANGE
  function onInputChange(e) {
    e.preventDefault();
    if (
      e.target.name === "username" ||
      e.target.name === "email" ||
      e.target.name === "password"
    ) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
      validations(e.target.name, e.target.value);
      return;
    }
    if (e.target.name === "confirmPass") {
      setConfirmPass(e.target.value);
      validations(e.target.name, e.target.value);
      return;
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    validations(e.target.name, e.target.value.toLowerCase());
  }
  // // // // // // // // // VALIDACIÓN DE ERRORES
  function validations(name, value) {
    if (name === "name" || name === "lastName") {
      if (!/^([a-z]+\s)*[a-z]+$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Name must be only words withouth numbers and only one whitespace between them.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }

    if (name === "username") {
      if (!/^[a-zA-Z0-9]*$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Username must be only one word, numbers allowed, no whitespaces allowed.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "password" || name === "confirmPass") {
      if (name === "password") {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value))
          return setErrors({
            ...errors,
            [name]:
              "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
            confirmPass: "Passwords must be the same.",
          });
        else {
          if (user.password !== confirmPass)
            return setErrors({
              ...errors,
              [name]: "Passwords must be the same.",
              confirmPass: "Passwords must be the same.",
            });
          delete errors[name];
          return setErrors({ ...errors });
        }
      }
      if (name === "confirmPass") {
        if (user.password !== value)
          return setErrors({
            ...errors,
            [name]: "Passwords must be the same.",
            password: "Passwords must be the same.",
          });
        else {
          delete errors[name];
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value))
            return setErrors({
              ...errors,
              password:
                "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
            });
          else {
            delete errors.password;
          }
          return setErrors({ ...errors });
        }
      }
    }
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return setErrors({
          ...errors,
          [name]: "Must be a valid Email.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
  }

  // // // // // // // // //
  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("/user/signup", user)
      .then((el) => {
        window.sessionStorage.setItem("token", el.data.token);
        dispatch(loging());
        setOpen(true);
        setTimeout(() => history.push("/"), 2300);
      })
      .catch((el) =>
        setErrors({ ...errors, ...JSON.parse(el.request.response) })
      );
  }
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

  // // // // // // // // // // // CONTROLADORES MUI
  const [show, setShow] = useState({
    password: false,
    confirmPass: false,
  });
  const handleClickShowPassword = (name) => {
    console.log(name);
    setShow({
      ...show,
      [name]: !show[name],
    });
  };
  // // // // // // // // // // // // // // // //

  return (
    <div className="userAccountContainer">
      <div className="containerAccount">
        <div className="sign-in-containerAccount">
          <form onSubmit={onSubmit}>
            <h2>Create Account</h2>

            {/* Name Input */}
            <TextField
              sx={{ m: 0.5, width: "50ch" }}
              className="textfieldWithCap"
              label="Name*"
              autoComplete="off"
              onChange={onInputChange}
              name="name"
              type="text"
              value={user.name}
              placeholder="Name"
              inputProps={{ maxLength: 40 }}
              error={errors.name ? true : false}
              helperText={errors.name ? `${errors.name}` : null}
            />

            {/* lastName Input */}
            <TextField
              sx={{ m: 0.5, width: "50ch" }}
              className="textfieldWithCap"
              label="Last name*"
              autoComplete="off"
              onChange={onInputChange}
              name="lastName"
              type="text"
              value={user.lastName}
              placeholder="Last name"
              inputProps={{ maxLength: 40 }}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? `${errors.lastName}` : null}
            />

            {/* Username Input */}
            <TextField
              sx={{ m: 0.5, width: "50ch" }}
              className="textfield"
              label="Username*"
              autoComplete="off"
              onChange={onInputChange}
              name="username"
              type="text"
              value={user.username}
              placeholder="Username"
              inputProps={{ maxLength: 40 }}
              error={errors.username ? true : false}
              helperText={errors.username ? `${errors.username}` : null}
            />

            {/* E-mail Input */}
            <TextField
              sx={{ m: 0.5, width: "50ch" }}
              className="textfield"
              label="E-mail*"
              autoComplete="off"
              onChange={onInputChange}
              name="email"
              type="text"
              value={user.email}
              placeholder="E-mail"
              inputProps={{ maxLength: 40 }}
              error={errors.email ? true : false}
              helperText={errors.email ? `${errors.email}` : null}
            />

            {/* Password Form Control */}
            <FormControl sx={{ m: 0.5, width: "50ch" }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.password ? true : false}
              >
                Password*
              </InputLabel>
              <OutlinedInput
                id="passwordInput"
                label="Password*"
                type={show.password ? "text" : "password"}
                value={user.password}
                placeholder="Password"
                name="password"
                onChange={onInputChange}
                error={errors.password ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        bgcolor: "white",
                        ":hover": { bgcolor: "#00cc77" },
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
              {errors.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            {/* Confirm Password Form Control */}
            <FormControl sx={{ m: 0.5, width: "50ch" }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.confirmPass ? true : false}
              >
                Confirm Password*
              </InputLabel>
              <OutlinedInput
                id="passwordInput"
                label="Confirm Password*"
                type={show.confirmPass ? "text" : "password"}
                value={confirmPass}
                placeholder="Confirm Password"
                name="confirmPass"
                onChange={onInputChange}
                error={errors.confirmPass ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        bgcolor: "white",
                        ":hover": { bgcolor: "#00cc77" },
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
              {errors.confirmPass ? (
                <FormHelperText error>{errors.confirmPass}</FormHelperText>
              ) : null}
            </FormControl>
            {/* BUTTONS */}
            <div className="formInputsx">
              {/* <Link to="/login">
                <button style={{ width: "200px" }} className="bottoms">
                  Cancel
                </button>
              </Link> */}
              <button
                // style={{ width: "300px", cursor: "pointer" }}
                type="submit"
                className="bottoms"
                disabled={
                  JSON.stringify(errors) !== "{}" ||
                  !user.name ||
                  !user.lastName ||
                  !user.username ||
                  !user.email ||
                  !user.password ||
                  !confirmPass
                }
              >
                Create Account!
              </button>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="User created!"
              action={action}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
