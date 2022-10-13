import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.users);

  return (
    <div className="userOuterDiv">
      <div className="userInnerDiv">
        <div className="titlePencilContainer">
          <h1 style={{margin:'0'}}>Profile</h1>
          {/* <p className="pencilIcon">✎</p> */}
        </div>
        <img src={loggedUser.picture} className="userImage" />
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
      </div>
    </div>
  );
};

export default UserDetails;
