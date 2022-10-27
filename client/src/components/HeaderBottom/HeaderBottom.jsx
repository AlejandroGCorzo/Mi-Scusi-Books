import React from "react";
import { Link } from "react-router-dom";
import "./HeaderBottom.css";

export default function headerBottom() {
  return (
    <div className="headerBottom">
      <Link to="/about" style={{ textDecoration: "none" }}>
        <p className="aboutText">About</p>
      </Link>
    </div>
  );
}
