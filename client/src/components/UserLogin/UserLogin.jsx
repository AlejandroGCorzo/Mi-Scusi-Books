import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loging } from "../../redux/StoreUsers/usersActions.js";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./UserLogin.css";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import AlertDialogSlide from "../AccountCreate/SlideAlert/SlideAlert.jsx";
import { putForgotPassword } from "../../redux/StoreUsers/usersActions";

export default function UserLogin() {
  // // // // // // // // // // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();
  let localCart = window.sessionStorage.getItem("cart");
  // // // // // // // // // // STATES
  const emptyInput = {
    email: "",
    password: "",
  };
  const [rememberMe, setRememberMe] = useState(false);
  const [input, setInput] = useState(emptyInput);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  // // // // // // // // // // FUNCTIONS
  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.name === "email")
      setInput({
        ...input,
        [e.target.name]: e.target.value.toLowerCase(),
      });
    else
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    validations(e.target.name, e.target.value);
    if (errors.msg) {
      delete errors.msg;
      setErrors({ ...errors });
    }
  }
  // // // // // // // // //

  function validations(name, value) {
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+[^\.]$/.test(value))
        return setErrors({
          ...errors,
          [name]: "Must be a valid Email.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "password") {
      if (!/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)[a-zA-ZñÑ\d]{8,}$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
        });
      delete errors[name];
      return setErrors({ ...errors });
    }
  }

  // // // // // // // // //

  async function handleLogIn(e) {
    e.preventDefault();
    let cart = [],
      amounts = [];
    if (localCart) {
      localCart = JSON.parse(localCart);
      console.log(localCart);
      cart = localCart?.books.map((el) => el.id);
      amounts = localCart?.books.map((el) => el.amount);
    }

    axios
      .post("/user/login", { ...input, cart, amounts })
      .then((el) => {
        if (el.data.msg) {
          setOpen(true);
          setText(el.data.msg);
        } else {
          if (rememberMe) window.localStorage.setItem("token", el.data.token);
          else window.sessionStorage.setItem("token", el.data.token);
          dispatch(loging());
          window.sessionStorage.removeItem("cart");
          history.push("/log-in-successfully");
        }
      })
      .catch((e) => {
        setErrors({ ...errors, ...JSON.parse(e.request.response) });
      });
  }

  function googleSuccessData(response) {
    let cart = [],
      amounts = [];
    if (localCart) {
      localCart = JSON.parse(localCart);
      console.log(localCart);
      cart = localCart?.books.map((el) => el.id);
      amounts = localCart?.books.map((el) => el.amount);
    }
    console.log("cart", cart);
    axios
      .post(
        `/user/login_google`,
        { cart, amounts },
        {
          headers: {
            authorization: `Bearer ${response.credential}`,
          },
        }
      )
      .then((el) => {
        window.localStorage.setItem("token", el.data.token);
        dispatch(loging());
        window.sessionStorage.removeItem("cart");
        history.push("/log-in-successfully");
      })
      .catch((e) => console.log(e));
  }
  // // // // // // // // // // //
  const [show, setShow] = useState(false);
  // // // // // // // // // // //

  // // // // // // // // // // //
  // Funciones para forgot password
  // // // // // // // // // // //
  const { forgotPassword } = useSelector((state) => state.users);
  const [openDialog, setOpenDIalog] = useState(false);
  const [errorForgot, setErrorForgot] = useState(
    "Please enter a valid email address"
  );
  const [forgotPasswordInput, setForgotPasswordInput] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);

  const handleForgotPasswordInput = (e) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+[^\.]$/.test(e.target.value))
      setErrorForgot("Please enter a valid email address");
    else setErrorForgot("");
    setForgotPasswordInput(e.target.value);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log(forgotPasswordInput);
    setVerifyEmail(true);
    setTimeout(() => dispatch(putForgotPassword(forgotPasswordInput)), 1000);

    // setTimeout(()=>setOpenDIalog(false),2000)
    // setTimeout(() => setVerifyEmail(true), 1500);
  };

  const handleClickOpenDialog = () => {
    setOpenDIalog(true);
  };

  const handleCloseDialog = () => {
    setOpenDIalog(false);
    setVerifyEmail(false);
    setForgotPasswordInput("");
    dispatch(putForgotPassword(""));
  };
  // // // // // // // // // // USEEFFECT
  useEffect(() => {
    if (
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token")
    )
      history.push("/");
  }, [dispatch]);
  return (
    <div className="userLoginDiv">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogIn}>
            <h1>Login</h1>
            {/* E-mail Input */}
            <TextField
              sx={{ m: 0.5 }}
              className="textfieldLogin"
              label="E-mail*"
              autoComplete="off"
              onChange={handleInputChange}
              name="email"
              type="text"
              value={input.email}
              placeholder="E-mail"
              inputProps={{ maxLength: 40 }}
              error={errors.email ? true : false}
              helperText={errors.email ? `${errors.email}` : null}
            />

            {/* Password Form Control */}
            <FormControl
              sx={{ m: 0.5 }}
              variant="outlined"
              className="textfieldLogin"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.password ? true : false}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="passwordInput"
                label="Password"
                type={show ? "text" : "password"}
                value={input.password}
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                error={errors.password ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className="loginButton"
                      sx={{
                        bgcolor: "white",
                        ":hover": { bgcolor: "#287ccb" },
                      }}
                      aria-label="toggle password visibility"
                      onClick={() => setShow(!show)}
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : null}
              {errors.msg ? (
                <FormHelperText error>{errors.msg}</FormHelperText>
              ) : null}
            </FormControl>

            <div className="labelsito">
              <div>
                <input
                  type="checkbox"
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <div className="remember">
                <span>Remember me</span>
              </div>
            </div>
            <Link
              style={{ textDecoration: "none" }}
              onClick={handleClickOpenDialog}
            >
              <span>Forgot your password?</span>
            </Link>
            <div>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Forgot Password?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter your email address and we will send you an email with
                    instructions.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    autoComplete="off"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={forgotPasswordInput}
                    onChange={(e) => handleForgotPasswordInput(e)}
                  />
                  {/* <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={forgotPassword?.length}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop> */}
                  {errorForgot.length > 0 ? (
                    <p style={{ color: "red" }}>{errorForgot}</p>
                  ) : (
                    <></>
                  )}
                  <div className="miPropioDiv">
                    {verifyEmail ? (
                      forgotPassword ? (
                        <p style={{ color: "blue" }}>{forgotPassword}</p>
                      ) : (
                        <CircularProgress />
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                  <Button
                    disabled={errorForgot.length > 0 ? true : false}
                    onClick={handleForgotPasswordSubmit}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* <Link to={"/forgotPassword"} style={{ textDecoration: "none" }}>
              <span>Forgot your password?</span>
            </Link> */}
            <button
              disabled={
                JSON.stringify(errors) !== "{}" ||
                !input.email ||
                !input.password
              }
              type="submit"
            >
              Login
            </button>
            <div className="googleLoginBottom">
              <GoogleLogin
                onSuccess={googleSuccessData}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="accountMobile">
              <Link to={"/signup"}>
                <span>Don't have an account?!</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 style={{ color: "white" }}>Don't have an account?!</h1>
              <p>Enter your personal information and join us</p>
              <Link to={"/signup"}>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <AlertDialogSlide open={open} setOpen={setOpen} text={text} />
        </div>
      </div>
    </div>
  );
}
