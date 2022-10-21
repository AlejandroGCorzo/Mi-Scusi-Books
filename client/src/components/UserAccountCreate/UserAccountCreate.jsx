import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserAccountCreate.css";
import axios from "axios";
import { loging } from "../../redux/StoreUsers/usersActions";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
var errors = {};

function espacios(string) {
  var contador = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] === " ") contador++;
  }

  return contador;
}

function validar(valor) {
  const input = document.getElementById(valor);
  if (!input.checkValidity()) return false;
  return true;
}

function validate(user) {
  errors.name = "A name is required";
  errors.lastName = "A lastName is required";
  errors.username = "A username is required";
  errors.email = "A email is required";
  errors.password = "A password is required";
  errors.confirmPassword = "Confirm password";

  if (user.name) delete errors.name;
  if (user.lastName) delete errors.lastName;
  if (user.username) delete errors.username;
  if (user.email) delete errors.email;
  if (user.password) delete errors.password;
  if (user.confirmPassword) delete errors.confirmPassword;

  if (validar("name") === false) errors.name = "Invalid character";
  if (validar("lastName") === false) errors.lastName = "Invalid character";

  if (!user.email) errors.email = "Email is required";
  if (user.email.length < 6)
    errors.email = "Email must contain at least 6 characters";
  if (!/^\S[^`~,¡!#$%^&*()+={}[/|¿?"'<>;:]{0,}$/.test(user.email))
    errors.email = "Email can contain only letters, numbers, -, _, or .";
  if (!/^\S+@\S+\.\S+$/.test(user.email)) errors.email = "Email is invalid";
  if (user.password !== user.confirmPassword)
    errors.confirmPassword = "Different password ";

  if (espacios(user.name) > 2 || user.name[0] === " ")
    errors.name = "Max 2 spaces";
  if (espacios(user.lastName) > 2 || user.lastName[0] === " ")
    errors.lastName = "Max 2 spaces";
  if (espacios(user.username) > 0 || user.username[0] === " ")
    errors.username = "Username invalid";
  return errors;
}

export default function AccountCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    email: "",

    confirmPassword: "",
  });

  function onInputChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (Object.entries(errors).length !== 0) {
      alert("Please complete all fields!");
    } else {
      console.log(user);
      axios
        .post("/user/signup", user)
        .then((el) => {
          console.log(el);
          window.sessionStorage.setItem("token", el.data.token);
          dispatch(loging());
        })
        .then(() => setOpen(true))
        .then(() => setTimeout(()=>history.push('/'),2300))
        .catch((el) => console.log(el));
    }
  }
  console.log(errors);
  function handleClose(){
    setOpen(false)
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{"width":"50px"}}
      >
        <CloseIcon fontSize="small"  />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="userAccountContainer">
      <div className="containerAccount">
        <div className="sign-in-containerAccount">
          <form onSubmit={onSubmit}>
            <h2>Create Account</h2>
            <div className="formInputs">
              {/* Input Name */}
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="name"
                name="name"
                type="text"
                value={user.name}
                className="input"
                // required
                placeholder="Name..."
                // pattern="^[A-Za-z\s]+$"
                maxLength="40"
              />
              {errors.name && <p className="error">{errors.name}</p>}

              {/* Input lastName */}
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="lastName"
                name="lastName"
                type="text"
                value={user.lastName}
                className="input"
                // required
                placeholder="lastName..."
                pattern="^[A-Za-z\s]+$"
                maxLength="40"
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div className="formInputs">
              {/* Input Username */}
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="username"
                name="username"
                type="text"
                value={user.username}
                className="input"
                // required
                placeholder="Username..."
                pattern="^[A-Za-z\s]+$"
                maxLength="40"
              />
              {errors.username && <p className="error">{errors.username}</p>}

              {/* Input E-mail */}
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="email"
                name="email"
                type="text"
                value={user.email}
                className="input"
                // required
                placeholder="E-mail..."
                maxLength="40"
              />

              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="formInputs">
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="password"
                name="password"
                type="password"
                value={user.password}
                className="input"
                // required
                placeholder="Password..."
                maxLength="40"
              />
              {errors.password && <p className="error">{errors.password}</p>}

              {/* Input Confirm Password */}
              <input
                autoComplete="off"
                onChange={onInputChange}
                // id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                className="input"
                // required
                placeholder="Confirm Password..."
                maxLength="40"
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="formInputsx">
              <Link to="/login">
                <button className="bottoms">Cancel</button>
              </Link>
              <button type="submit" className="bottoms">
                Create
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
