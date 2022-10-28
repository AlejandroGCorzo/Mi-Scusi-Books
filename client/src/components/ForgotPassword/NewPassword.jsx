import React from "react";
import "./NewPassword.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putNewPassword } from "../../redux/StoreUsers/usersActions";
import { TextField, Button } from "@mui/material";
import { validations } from "../AccountCreate/Functions/validations";

export default function NewPassword() {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((state) => state.users);

  useEffect(() => {}, [dispatch]);

  const querystring = window.location.search;

  // usando el querystring, creamos un objeto del tipo URLSearchParams
  const params = new URLSearchParams(querystring);
  const token = params.get("reset");

  const [input, setInput] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState({
    newPassword: "",
    confirmNewPassword: "",
    confirmPass:""
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if(e.target.name === 'newPassword' || e.target.name === 'confirmPass'){
      if(e.target.name === 'newPassword'){
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(e.target.value))
        return setError({
          ...error,
          [e.target.name]:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
          confirmPass: "Passwords must be the same.",
        });
      else {
        if (input.newPassword !== input.confirmNewPassword)
          return setError({
            ...error,
            [e.target.name]: "Passwords must be the same.",
            confirmPass: "Passwords must be the same.",
          });
        delete error[e.target.name];
        return setError({ ...error });
      }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putNewPassword(input.newPassword, token));
  };
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
          {error.newPassword?.length > 0 ? <p>{error.newPassword}</p> : <></>}
        </div>
        <div className="textFieldNewPassword">
          <TextField
            sx={{ m: 0.5 }}
            label="Repeat new password*"
            autoComplete="off"
            name="confirmNewPassword"
            className="newPassword"
            type="text"
            placeholder="Repeat new password"
            inputProps={{ maxLength: 40 }}
            value={input.confirmNewPassword}
            onChange={(e) => handleInput(e)}
          />
          {error.confirmNewPassword?.length > 0 ? (
            <p>{error.confirmNewPassword}</p>
          ) : (
            <></>
          )}
        </div>
            {error.confirm?.length > 0 ? (
            <p>{error.confirm}</p>
          ) : (
            <></>
          )}
        <div className="newPasswordButton">
          <Button disabled={error.newPassword || error.confirmNewPassword} variant="outlined">Submit</Button>
        </div>
      </div>

      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Ingresa tu nueva contraseña</label>
          <input
            name="newPassword"
            value={input.newPassword}
            onChange={(e) => handleInput(e)}
            // placeholder="password"
            type="password"
          ></input>
        </div>
        <div>
          <label>Repetila por si las dudas</label>
          <input
            name="confirmNewPassword"
            value={input.confirmNewPassword}
            onChange={(e) => handleInput(e)}
            // placeholder="password"
            type="password"
          ></input>
        </div>
        <hr />
        <button type="submit">Submit</button>
      </form> */}
      <div>{forgotPassword ? <h1>{forgotPassword}</h1> : <></>}</div>
    </div>
  );
}
