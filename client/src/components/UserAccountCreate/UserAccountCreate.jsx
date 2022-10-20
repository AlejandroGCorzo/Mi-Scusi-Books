import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserAccountCreate.css";
import imgLibritos from "../../sourceImg/imgLibritos.png";
import axios from "axios";
import { loging } from "../../redux/StoreUsers/usersActions";
import EmailIcon from '@mui/icons-material/Email';
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
  // errors.dni = "A dni is required";
  // errors.phone = "A phone is required";
  // errors.address = "A address is required";
  // errors.birthdate = "A birthdate is required";
  errors.password = "A password is required";
  errors.confirmPassword = "Confirm password";

  if (user.name) delete errors.name;
  if (user.lastName) delete errors.lastName;
  if (user.username) delete errors.username;
  if (user.email) delete errors.email;
  // if (user.dni) delete errors.dni;
  // if (user.phone) delete errors.phone;
  // if (user.address) delete errors.address;
  // if (user.birthdate) delete errors.birthdate;
  if (user.password) delete errors.password;
  if (user.confirmPassword) delete errors.confirmPassword;

  if (validar('name') === false) errors.name = "Invalid character";
  if (validar('lastName') === false) errors.lastName = "Invalid character";

  if (!user.email) errors.email = "Email is required";
  if (user.email.length < 6)
    errors.email = "Email must contain at least 6 characters";
  if (!/^\S[^`~,¡!#$%^&*()+={}[/|¿?"'<>;:]{0,}$/.test(user.email))
    errors.email = "Email can contain only letters, numbers, -, _, or .";
  if (!/^\S+@\S+\.\S+$/.test(user.email)) errors.email = "Email is invalid";
  if (user.password !== user.confirmPassword)
    errors.confirmPassword = "Different password ";
  // } else if (!usersEmail.includes(user.email)) {
  //   errors.email = "That email doesn't exist";
  // }

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

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    // dni: "",
    // phone: "",
    // address: "",
    // birthdate: "",
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
      //dispatch(postUser(User)); Acá hay que agregar para que mande el post
      // alert("Successfully created character, check your email!");
      console.log(user);
      axios
        .post("/user/signup", user)
        .then((el) => {
          console.log(el);
          window.sessionStorage.setItem("token", el.data.token);
          dispatch(loging());
        })
        .catch((el) => console.log(el));
      // setUser({ user });
      // history.push("/");
    }
  }
  console.log(errors);
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
                      id="name"
                      name="name"
                      type="text"
                      value={user.name}
                      className="input"
                      required
                      placeholder="Name..."
                      pattern="^[A-Za-z\s]+$"
                      maxLength="20"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    {/* Input lastName */}
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={user.lastName}
                      className="input"
                      required
                      placeholder="lastName..."
                      pattern="^[A-Za-z\s]+$"
                      maxLength="20"
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}

                </div>
                <div className="formInputs">

                    {/* Input Username */}
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="username"
                      name="username"
                      type="text"
                      value={user.username}
                      className="input"
                      required
                      placeholder="Username..."
                      pattern="^[A-Za-z\s]+$"
                      maxLength="20"
                    />
                    {errors.username && (
                      <p className="error">{errors.username}</p>
                    )}
                    
                    {/* Input E-mail */}
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="email"
                      name="email"
                      type="text"
                      value={user.email}
                      className="input"
                      required
                      placeholder="E-mail..."
                      maxLength="40"
                    />

                  {errors.email && <p className="error">{errors.email}</p>}

                </div>
                <div className="formInputs">
                  {/* <div className="divFormInputs">
                    <span> DNI </span>
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="dni"
                      name="dni"
                      type="number"
                      value={user.dni}
                      className="input"
                      required
                      placeholder="DNI..."
                      pattern="^[A-Za-z]+$"
                      maxLength="8"
                    />
                    {errors.dni && <p className="error">{errors.dni}</p>}
                  </div> */}

                  {/* <div className="divFormInputs">
                    <span> Phone </span>
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="phone"
                      name="phone"
                      type="number"
                      value={user.phone}
                      className="input"
                      required
                      placeholder="Phone..."
                      pattern="^[A-Za-z]+$"
                      maxLength="10"
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                  </div> */}
                </div>

                <div className="formInputs">
                  {/* <div className="divFormInputs">
                    <span> Address </span>
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="address"
                      name="address"
                      type="text"
                      value={user.address}
                      className="input"
                      required
                      placeholder="Address..."
                      maxLength="40"
                    />
                    {errors.address && (
                      <p className="error">{errors.address}</p>
                    )}
                  </div> */}

                  {/* <div className="divFormInputs">
                    <span> birthdate </span>
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={user.birthdate}
                      className="input"
                      required
                      placeholder="11/12/2000..."
                      pattern="^[A-Za-z]+$"
                      maxLength="20"
                    />
                    {errors.birthdate && (
                      <p className="error">{errors.birthdate}</p>
                    )}
                  </div> */}
                </div>

                <div className="formInputs">

                    {/* Input Password */}
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      className="input"
                      required
                      placeholder="Password..."
                      pattern="^[A-Za-z\s]+$"
                      maxLength="20"
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}


                    {/* Input Confirm Password */}
                    <input
                      autoComplete="off"
                      onChange={onInputChange}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={user.confirmPassword}
                      className="input"
                      required
                      placeholder="Confirm Password..."
                      pattern="^[A-Za-z\s]+$"
                      maxLength="20"
                    />
                    {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>

                <div className="formInputsx">
                  <Link to="/login">
                    <button className="bottoms">Cancel</button>
                  </Link>
                  <button
                    type="submit"
                    className="bottoms"
                  >
                    Create
                  </button>
                </div>

              </form>
            </div>
          </div>
      </div>

  );
}
