import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import img from "../../sourceImg/logo3.png";
import "./PaymentAcepted.css"

export default function PaymentAcepted() {
  const dispatch = useDispatch();
  const history = useHistory();
  //traer al cart

  // useEffect(() {
  //   dispatch(())
  // })

  return (
    <>
      <section className="paymentAceptedModal">
        <div className="divPaymentModal">
          <img src={img} alt="" className="imgPaymentModal"/>
        <h1>Payment Succesful!</h1>
        <h3>Thank you for purchasing</h3>
        <p>Check your email to view details</p>
        <button className="btnHome" type="button" onClick={() => history.push("/")}>
          <b>GO HOME</b>
        </button>
        </div>
      </section>
    </>
  );
}
