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
        <h1>Shoping/Purchases</h1>
        <div className="saveProfile">
          <button>View All</button>
        </div>
      </div>
      <div className="userInnerDiv">
        <button className="pencilButton">✎</button>
        <div className="titleContainer">
          <span></span>
          <h1 style={{ margin: "0" }}>Profile</h1>
        </div>
        <div className="userImage">
          <img src={loggedUser.picture} />
        </div>
        <div className="userInfoContainer">
          <span>Username: {loggedUser.nickname}</span>
          <span>Name: {loggedUser.firstName}</span>
          <span>Last Name: {loggedUser.lastName}</span>
          <span>E-mail: {loggedUser.email}</span>
          <span>DNI: {loggedUser.dni}</span>
          <span>Phone: {loggedUser.phone}</span>
          <span>Address: {loggedUser.address.street} {loggedUser.address.number}, {loggedUser.address.floor}</span>
          {/* <span>Street: {loggedUser.address.street}</span>
          <span>Number: {loggedUser.address.number}</span>
          <span>Floor: {loggedUser.address.floor}</span> */}
          <span>Birthday: {loggedUser.birthdate}</span>
          {/* <span>Verify: {loggedUser.state}</span> */}
          <span>Loyalty points: {loggedUser.loyaltyPoint}</span>
        </div>
        <div className="saveProfile">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
