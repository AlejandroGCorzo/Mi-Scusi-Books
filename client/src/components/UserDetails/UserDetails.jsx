import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.users);

  return (
    <div className="userOuterDiv">
      <div className="shopingDiv">
        <h1>Shoping</h1>
      </div>
      <div className="userInnerDiv">
        <div className="titlePencilContainer">
          <span></span>
          <h1 style={{ margin: "0" }}>Profile</h1>
          <button>✎</button>
        </div>
        <div className="userImage">
          <img src={loggedUser.picture} />
        </div>
        <div className="userInfoContainer">
          <span>Username: {loggedUser.nickname}</span>
          <span>First Name: {loggedUser.firstName}</span>
          <span>Last Name: {loggedUser.lastName}</span>
          <span>E-mail: {loggedUser.email}</span>
          <span>DNI: {loggedUser.dni}</span>
          <span>Phone: {loggedUser.phone}</span>
          <span>Address: </span>
          <span>Street: {loggedUser.address.street}</span>
          <span>Number: {loggedUser.address.number}</span>
          <span>Floor: {loggedUser.address.floor}</span>
          <span>Birthday: {loggedUser.birthdate}</span>
          <span>Verify: {loggedUser.state}</span>
          <span>Bills: {loggedUser.bills}</span>
        </div>
        <div className="saveProfile">
          <button>save</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
