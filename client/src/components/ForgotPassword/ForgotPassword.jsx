import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putForgotPassword } from "../../redux/StoreUsers/usersActions";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const {forgotPassword} = useSelector((state)=>state.users)
  useEffect(()=>{
  },[dispatch])

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putForgotPassword(input))
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
      <div>
        {
          forgotPassword? <h1>{forgotPassword}</h1> : <></>
        }
      </div>
    </div>
  );
}
