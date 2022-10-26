import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Olvidaste tu clave pa?</h1>
      <hr />
      <h3>No hay problema, acá te lo soluciono rey</h3>
      <h6>Flecha hacia abajo</h6>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Ingresa tu correo</label>
        <input
          value={input}
          onChange={(e) => handleInput(e)}
          placeholder="someone@email.com"
        ></input>
        <hr />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/NewPassword"}>Al ingreso de nueva contraseña</Link>
    </div>
  );
}
