import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putNewPassword } from "../../redux/StoreUsers/usersActions";

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

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putNewPassword(input.newPassword, token))
  };
  return (
    <div>
      <h1>Mete tu nueva clave mi loco</h1>
      <hr />
      <h3>Super facil asi no?</h3>
      <h6>Flecha hacia abajo</h6>
      <form onSubmit={(e) => handleSubmit(e)}>
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
      </form>
      <div>
        {
          forgotPassword? <h1>{forgotPassword}</h1> : <></>
        }
      </div>
    </div>
  );
}
