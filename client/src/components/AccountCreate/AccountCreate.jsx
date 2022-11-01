import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AccountCreate.css";
// // // // // FUNCTIONS IMPORT // // // //
import { validations, onSubmit } from "./Functions/exporter.js";
// // // // // MUI IMPORT // // // // //
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialogSlide from "./SlideAlert/SlideAlert";
// // // // // // // // // //
export default function AccountCreate() {
  // // // // // // // // //
  const dispatch = useDispatch();
  const history = useHistory();
  let localCart = window.sessionStorage.getItem("cart");
  // // // // // // // // //
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    cart: [],
    amounts: [],
  });

  useEffect(() => {
    let cart = [],
      amounts = [];
    if (localCart) {
      localCart = JSON.parse(localCart);
      cart = localCart?.books.map((el) => el.id);
      amounts = localCart?.books.map((el) => el.amount);
    }
    setUser({
      ...user,
      cart,
      amounts,
    });
  }, []);

  // // // // ON CHANGE // // // //
  function onInputChange(e) {
    e.preventDefault();
    //e.target.name === "username" ||
    if (e.target.name === "password") {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
      validations({
        name: e.target.name,
        password: e.target.value,
        errors,
        setErrors,
        confirmPass,
      });
      return;
    }
    if (e.target.name === "confirmPass") {
      setConfirmPass(e.target.value);
      validations({
        name: e.target.name,
        password: user.password,
        errors,
        setErrors,
        confirmPass: e.target.value,
      });
      return;
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    validations({
      name: e.target.name,
      value: e.target.value.toLowerCase(),
      errors,
      setErrors,
      confirmPass,
    });
  }
  // // // // // // // // //
  function handleClose() {
    setOpen(false);
  }
  // // // // // // // // //
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
  // // // // CONTROLADORES MUI // // // //
  const [show, setShow] = useState({
    password: false,
    confirmPass: false,
  });

  const handleClickShowPassword = (name) => {
    setShow({
      ...show,
      [name]: !show[name],
    });
  };
  // // // // // // // // //
  return (
    <div className="userAccountContainer">
      <div className="containerAccount">
        <div className="sign-in-containerAccount">
          <div className="contentTitleAccount">
            <h2>Create Account</h2>
          </div>

          <form
            onSubmit={(e) =>
              onSubmit(e, dispatch, history, user, setOpen, setErrors, errors)
            }
          >
            {/* Name Input */}
            <TextField
              sx={{ m: 0.5 }}
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
              sx={{ m: 0.5 }}
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
            {/* <TextField
              sx={{ m: 0.5 }}
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
            /> */}

            {/* E-mail Input */}
            <TextField
              sx={{ m: 0.5 }}
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
            <FormControl
              sx={{ m: 0.5 }}
              variant="outlined"
              className="textfield"
            >
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
              {errors.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            {/* Confirm Password Form Control */}
            <FormControl
              sx={{ m: 0.5 }}
              variant="outlined"
              className="textfield"
            >
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
              {errors.confirmPass ? (
                <FormHelperText error>{errors.confirmPass}</FormHelperText>
              ) : null}
            </FormControl>
            {/* BUTTONS */}
            <div className="formInputsx">
              <button
                type="submit"
                className="bottoms"
                disabled={
                  JSON.stringify(errors) !== "{}" ||
                  !user.name ||
                  !user.lastName ||
                  !user.email ||
                  !user.password ||
                  !confirmPass
                }
              >
                Create Account!
              </button>
            </div>
            <AlertDialogSlide open={open} setOpen={setOpen} />
            {/* <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="User created!"
              action={action}
            /> */}
          </form>
        </div>
      </div>
    </div>
  );
}
