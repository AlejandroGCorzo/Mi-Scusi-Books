import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./HeaderNav.css";
import userIcon from "../../sourceImg/user.svg";
import userShopping from "../../sourceImg/shopping-cart.svg";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function HeaderNav(onSearch) {
  const {
    loginWithPopup,
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

  const userLogueado = false; //Hasta que no tenga para ver si tengo el usuario logueado uso esta variable
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <p>Scusi Book's</p>
        </div>
      </Link>

      <SearchBar onSearch={onSearch} />

      <div>
        {userLogueado ? (
          <div className="iconsContainer">
            <Link to="/user/id">
              <img src={userIcon} alt="" />
            </Link>
            <Link to="/store">
              <img src={userShopping} alt="" />
            </Link>
          </div>
        ) : (
          <div className="iconsContainer">
            <span onClick={logout}>Logout</span>

            <span onClick={loginWithPopup}>Login</span>
            {/* <Link to="/login" style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link> */}
            <Link to="/create" style={{ textDecoration: "none" }}>
              <p>Sign Up</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
