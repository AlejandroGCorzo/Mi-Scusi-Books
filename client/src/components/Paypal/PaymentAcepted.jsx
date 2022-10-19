import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import test from "../../sourceImg/book-1.png";

export default function PaymentAcepted () {
  const dispatch = useDispatch();
  const history = useHistory();
  //traer al cart 

  // useEffect(() {
  //   dispatch(())
  // })

  return (
    <div>
      <div>
        <img src={test} alt="" width="300px" />
      </div>
      <h1>Payment Succesful!</h1>
      <h3>Thank you for purchasing</h3>
      <p>Check your email to view details</p>
      <button type="button" onClick={() => history.push("/")}>GO HOME</button>
    </div>
  )
}