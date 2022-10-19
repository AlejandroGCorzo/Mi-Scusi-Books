import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getUser } from "../../redux/StoreUsers/usersActions.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// const bcrypt = require("bcrypt");

export default function UserLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.users);
  // const usersEmail = users.map((u) => u.email);
  const emptyInput = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(emptyInput);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // dispatch(getUser());
  }, [dispatch]);

  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:9000/user/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
    axios
      .get("/user/login", input)
      .then((el) => {
        console.log(el.data);
      })
      .catch((e) => console.log(e));
    setInput(emptyInput);
    // history.push("/");
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

  return (
    <div>
      <section>
        <div>
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_568656.png"
            width="110px"
            height="110px"
          />
          <h1>LOGIN</h1>
        </div>
        <form onSubmit={handleLogIn}>
          <div>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder="you@example.com"
              value={input.email}
              onChange={handleInputChange}
              required
            />
            <span>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </span>
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              minLength={8}
              maxLength={16}
              placeholder="123456Aa"
              value={input.password}
              onChange={handleInputChange}
              required
            />
            <span>
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </span>
          </div>
          <div>
            <label>
              <input type="checkbox" id="cb1" value="cb" />
              Remember me
            </label>
            <Link
              to={"/login/password_reset"}
              style={{ textDecoration: "none" }}
            >
              <span>Forgot password?</span>
            </Link>
          </div>
          <button disabled={false} type="submit">
            LOGIN
          </button>
          {/* <input disabled={input.disabled} type="submit" value="LOGIN" /> */}
          {/* falta configurar el disabled */}
        </form>
        <div>
          <h3>Don't have an account?</h3>
          <Link to={"/signup"}>
            <button>SIGN UP</button>
          </Link>
          <ul>
            <li>
              <button onClick={loginWithPopup}>Login with Popup</button>
            </li>
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
          )}
        </div>
      </section>
    </div>
  );
}
