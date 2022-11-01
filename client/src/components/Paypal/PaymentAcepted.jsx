import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { payAccepted, loging } from "../../redux/StoreUsers/usersActions";
import img from "../../sourceImg/logo3.png";
import "./PaymentAcepted.css";

export default function PaymentAcepted() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { shippingAddress } = useSelector(state => state.users)
  const shipping = JSON.parse(window.sessionStorage.getItem('shipping')) || { }
  //traer al cart
  useEffect(() => {
    const accessToken =
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token");
    dispatch(payAccepted(accessToken, shipping));
    window.sessionStorage.removeItem('shipping')
  }, []);

  return (
    <>
      <section className="paymentAceptedModal">
        <div className="divPaymentModal">
          <img src={img} alt="" className="imgPaymentModal" />
          <h1>Payment Succesful!</h1>
          <h3>Thank you for purchasing</h3>
          <p>Check your email to view details</p>
          <button
            className="btnHome"
            type="button"
            onClick={() => {
              dispatch(loging());
              history.push("/");
            }}
          >
            <b>GO HOME</b>
          </button>
        </div>
      </section>
    </>
  );
}
