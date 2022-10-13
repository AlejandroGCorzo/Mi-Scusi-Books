import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./HeaderNav.css";
import userIcon from "../../sourceImg/user.svg";
import userShopping from "../../sourceImg/shopping-cart.svg";
import { getUserDetail } from "../../redux/StoreUsers/usersActions.js";
import { setEmptyLoggedUser } from "../../redux/StoreUsers/usersSlice.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function HeaderNav(onSearch) {
  const { loggedUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { loginWithPopup, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:9000/user/detail", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLoggin = async (e) => {
    e.preventDefault();
    await loginWithPopup();
    dispatch(getUserDetail(await callProtectedApi()));
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    dispatch(setEmptyLoggedUser());
  };

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <p>Scusi Book's</p>
        </div>
      </Link>

      <SearchBar onSearch={onSearch} />

      <div>
        {isAuthenticated ? (
          <div className="iconsContainer">
            <span onClick={handleLogOut}>Logout</span>
            <Link to="/user/id">
              <p>Profile</p>
            </Link>

            {/* <Link to="/store">
              <img src={userShopping} alt="" />
            </Link> */}
          </div>
        ) : (
          <div className="iconsContainer">
            <span onClick={handleLoggin}>Login</span>
            {/* <Link to="/login" style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link> */}
            {/* <Link to="/create" style={{ textDecoration: "none" }}>
              <p>Sign Up</p>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}
