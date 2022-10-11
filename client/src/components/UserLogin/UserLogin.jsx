import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getUser } from "../../redux/booksActions";

export default function UserLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector((state) => state.books);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    history.push("/");
  };

  function validate(input) {
    let errors = {};

    if (!input.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
      errors.email = "Email is invalid";
    }

    if (!input.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=.*\d)(?=(.*)).{8,15}$/.test(
        input.password
      )
    ) {
      errors.password = "Password is invalid ";
    }
    return errors;
  } //desglosar validaciones
  //verificar existencia

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
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              value={input.email}
              onChange={handleInputChange}
              required
            />
            <span>{errors.email && <p>{errors.email}</p>}</span>
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              minLength={8}
              maxLength={15}
              placeholder="123456Aa"
              value={input.password}
              onChange={handleInputChange}
              required
            />
            <span>{errors.password && <p>{errors.password}</p>}</span>
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
          <button type="submit">SIGN IN</button>
        </form>
        <div>
          <h3>Don't have an account?</h3>
          <Link to={"/signup"}>
            <button>SIGN UP</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
