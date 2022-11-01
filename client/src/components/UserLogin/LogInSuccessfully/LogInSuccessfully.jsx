import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loging } from "../../../redux/StoreUsers/usersActions";
import img from "../../../sourceImg/logo3.png";
import "./LogInSuccessfully.css";

export default function LogInSuccessfully() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { firstName } = useSelector((state) => state.users.loggedUser);
  return (
    <>
      {firstName && (
        <section className="logInAcepted">
          <div className="logInModal">
            <img src={img} alt="" className="imglogInModal" />
            <h1>Welcome {firstName}!</h1>
            <h3>Successfully loged in.</h3>
            <button
              className="btnloginHome"
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
      )}
    </>
  );
}
