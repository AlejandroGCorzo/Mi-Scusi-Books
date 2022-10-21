import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loging } from "../../redux/StoreUsers/usersActions.js";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./UserLogin.css";

export default function UserLogin() {
  // // // // // // // // // // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();
  // // // // // // // // // // STATES
  const emptyInput = {
    email: "",
    password: "",
  };
  const [rememberMe, setRememberMe] = useState(false);
  const [input, setInput] = useState(emptyInput);
  const [errors, setErrors] = useState("");
  // // // // // // // // // // USEEFFECT
  useEffect(() => {
    if (
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token")
    )
      history.push("/");
  }, [dispatch]);
  // // // // // // // // // // FUNCTIONS
  function handleInputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogIn(e) {
    e.preventDefault();
    axios
      .post("/user/login", input)
      .then((el) => {
        if (rememberMe) window.localStorage.setItem("token", el.data.token);
        else window.sessionStorage.setItem("token", el.data.token);
        dispatch(loging());
        history.push("/");
      })
      .catch((e) => {
        console.log("error", e);
        setErrors(`${JSON.parse(e.request.response).msg}`);
      });
  }

  function googleSuccessData(response) {
    axios
      .get(`/user/login_google`, {
        headers: {
          authorization: `Bearer ${response.credential}`,
        },
      })
      .then((el) => {
        window.localStorage.setItem("token", el.data.token);
        dispatch(loging());
        history.push("/");
      })
      .catch((e) => console.log(e));
  }
  // // // // // // // // // // //
  return (
    <div className="userLoginDiv">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogIn}>
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="E-mail"
              value={input.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              minLength={6}
              maxLength={16}
              placeholder="Password"
              value={input.password}
              onChange={handleInputChange}
              required
            />
            <span>{errors && <p style={{ color: "red" }}>{errors}</p>}</span>
            <div className="labelsito">
              <div>
                <input
                  type="checkbox"
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <div className="remember">
                <span>Remember me</span>
              </div>
            </div>
            <Link
              to={"/login/password_reset"}
              style={{ textDecoration: "none" }}
            >
              <span>Forgot your password?</span>
            </Link>
            <button disabled={false} type="submit">
              Login
            </button>
            <GoogleLogin
              // buttonText="Sign in with Google"
              onSuccess={googleSuccessData}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <div className="accountMobile">
              <Link to={"/signup"}>
                <span>Don't have an account?!</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?!</h1>
              <p>Enter your personal information and join us</p>
              <Link to={"/signup"}>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
