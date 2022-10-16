import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.users);

  return (
    <div className="userOuterDiv">
      <div className="contentCategoryx">
            <div className="titleForm">
                <p>Shopping/Purchases</p>
            </div>

            <div className="contentCategoryDiv">
                <div className="categoryDiv">

                </div>
            </div>

            <div className="formBack">
                <Link to ="/" style={{ textDecoration: "none" }}>
                    <button className="buttonBack">View All</button>
                </Link>
            </div>
        </div>
        <div className="contentCategoryx">
            <div className="titleForm">
                <p>Profile</p>
                <button className="pencilButton">✎</button>
            </div>

            <div className="contentCategoryDiv">
                <div className="categoryDiv">
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
                </div>
            </div>

            <div className="formBack">
                <Link to ="/" style={{ textDecoration: "none" }}>
                    <button className="buttonBack">Save</button>
                </Link>
            </div>

      </div>
    </div>
  );
};

export default UserDetails;
