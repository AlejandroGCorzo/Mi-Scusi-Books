import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderBottom.css";

export default function HeaderBottom() {
  const { loggedUser } = useSelector((state) => state.users);

  return (
    <div className={Object.keys(loggedUser).length > 0 ? "loggedHeaderBottom" : "headerBottom"}>
      <Link to="/about" style={{ textDecoration: "none" }}>
        <p className="aboutText">About</p>
      </Link>
      {Object.keys(loggedUser).length > 0 && (
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <p className="reportText">Report a problem</p>
        </Link>
      )}
    </div>
  );
}
