import React from "react";
import { useState } from "react";

export default function NewPassword() {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
            value={input}
            onChange={(e) => handleInput(e)}
            placeholder="password"
            type="password"
          ></input>
        </div>
        <div>
          <label>Repetila por si las dudas</label>
          <input
            value={input}
            onChange={(e) => handleInput(e)}
            placeholder="password"
            type="password"
          ></input>
        </div>
        <hr />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
