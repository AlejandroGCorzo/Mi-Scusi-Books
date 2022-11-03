import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./HeaderBottom.css";

export default function HeaderBottom() {
  const { loggedUser } = useSelector((state) => state.users);
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  return (
    <div className={accessToken ? "headerBottom" : "loggedHeaderBottom"}>
      <Link to="/about" style={{ textDecoration: "none" }}>
        <p className="aboutText">About</p>
      </Link>
      {accessToken && (
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <p className="reportText">Report a problem</p>
        </Link>
      )}
    </div>
  );
}
