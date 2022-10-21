import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loging } from "../../redux/StoreUsers/usersActions.js";
// import { useAuth0 } from "@auth0/auth0-react";
import { GoogleLogin } from "@react-oauth/google";

import axios from "axios";
import "./UserLogin.css";
// import GoogleIcon from "@mui/icons-material/Google";
// const bcrypt = require("bcrypt");

export default function UserLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);
  const [rememberMe, setRememberMe] = useState(false);
  // const { users } = useSelector((state) => state.users);
  // const usersEmail = users.map((u) => u.email);
  const emptyInput = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(emptyInput);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    // dispatch(getUser());
    if (
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token")
    )
      history.push("/");
  }, [dispatch]);

  // const {
  //   loginWithPopup,
  //   loginWithRedirect,
  //   logout,
  //   user,
  //   isAuthenticated,
  //   getAccessTokenSilently,
  // } = useAuth0();

  // const callProtectedApi = async () => {
  //   try {
  //     const token = {};
  //     const response = await axios.get("/user/protected", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  function handleInputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  async function handleLogIn(e) {
    e.preventDefault();
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(input.password, salt);
    // console.log(input);
    axios
      .post("/user/login", input)
      .then((el) => {
        // console.log(el.data);
        if (rememberMe) window.localStorage.setItem("token", el.data.token);
        else window.sessionStorage.setItem("token", el.data.token);
        dispatch(loging());
        history.push("/");
      })
      .catch((e) => {
        console.log("error", e);
        setErrors(`${JSON.parse(e.request.response).msg}`);
      });
    // setInput(emptyInput);
  }

  // function validate(input) {
  //   let errors = {};

  //   if (!input.email) {
  //     errors.email = "Email is required";
  //   } else if (input.email.length < 6) {
  //     errors.email = "Email must contain at least 6 characters";
  //   } else if (!/^\S[^`~,¡!#$%^&*()+={}[/|¿?"'<>;:]{0,}$/.test(input.email)) {
  //     errors.email = "Email can contain only letters, numbers, -, _, or .";
  //   } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
  //     errors.email = "Email is invalid";
  //   } else if (!usersEmail.includes(input.email)) {
  //     errors.email = "That email doesn't exist";
  //   }

  //   if (!input.password) {
  //     errors.password = "Password is required";
  //   } else if (input.password.length < 8 || input.password.length >= 16) {
  //     errors.password =
  //       "Password must be min 8 characters and max 16 characters";
  //   } else if (
  //     !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,16}$/.test(input.password)
  //   ) {
  //     errors.password =
  //       "Password must contain at least one of the following: uppercase letters, lowercase letters, numbers and symbols";
  //   }
  //   return errors;
  // }

  function googleSuccessData(response) {
    // console.log(response.credential);
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

  return (
    <div className="userLoginDiv">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogIn}>
            <h1>Login</h1>
            {/* <div className="social-container">
              <p className="social">
                <GoogleIcon />
              </p>
            </div>
            <span>or use your account</span> */}
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="E-mail"
              value={input.email}
              onChange={handleInputChange}
              required
            />
            {/* <span>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </span> */}
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
            {/* <input disabled={input.disabled} type="submit" value="LOGIN" /> */}
            {/* falta configurar el disabled */}

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

      <div>
        {/* <li>
          <button onClick={loginWithPopup}>Login with Popup</button>
        </li> */}
        {/* <ul>
  <li>
    <button onClick={loginWithRedirect}>Login with Redirect</button>
  </li>
  <li>
    <button onClick={logout}>Logout</button>
  </li>
</ul>
<ul>
  <li>
    <button onClick={callProtectedApi}>Call Protect Api</button>
  </li>
</ul>
<h3>User is {isAuthenticated ? "Logged in" : "Not logged in"}</h3>
{isAuthenticated && (
  <pre style={{ textAlign: "start" }}>
    {JSON.stringify(user, null, 2)}
  </pre>
)} */}
      </div>
    </div>
  );
}
