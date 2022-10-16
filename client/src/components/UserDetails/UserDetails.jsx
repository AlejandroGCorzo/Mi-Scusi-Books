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
            <div className="titleFormx">
                <p>Profile</p>
                <button className="pencilButtonx">✎</button>
            </div>

            <div className="contentCategoryDivx">
                <div className="categoryDivx">

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

            <div className="formBackx">
                <Link to ="/" style={{ textDecoration: "none" }}>
                    <button className="buttonBackx">Save</button>
                </Link>
            </div>
      </div>

      <div className="contentCategoryx">
            <div className="titleFormx">
                <p>Shopping</p>
            </div>

            <div className="contentCategoryDivx">
                <div className="categoryDivx">

                </div>
            </div>

            <div className="formBackx">
                <Link to ="/" style={{ textDecoration: "none" }}>
                    <button className="buttonBackx">View All</button>
                </Link>
            </div>
        </div>

    </div>
  );
};

export default UserDetails;
