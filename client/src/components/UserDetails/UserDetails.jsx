import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserDetails } from "../../redux/StoreUsers/usersActions";
import { clearUserDetail } from "../../redux/StoreUsers/usersSlice";
import "./UserDetails.css";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile } = useSelector((state) => state.users);
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  useEffect(() => {
    if (!token || profile.msg) {
      history.push("/");
    } else {
      dispatch(getUserDetails(props.match.params.id, token));
    }
    console.log(profile.image)
    return () => {
      dispatch(clearUserDetail());
    };
  }, [dispatch]);

  return (
    <>
      {profile._id ? (
        <div className="userOuterDiv">
          <div className="contentCategoryx">
            <div className="titleFormx">
              <p>Profile</p>
              <button className="pencilButtonx">✎</button>
            </div>

            <div className="contentCategoryDivx">
              <div className="categoryDivx">
                <div className="userImage">
                  <img src={profile.image.slice(0,profile.image.length-6)} referrerPolicy="no-referrer" />
                </div>

                <div className="userInfoContainer">
                  <span>Username: {profile.username}</span>
                  <span>Name: {profile.firstName}</span>
                  <span>Last Name: {profile.lastName}</span>
                  <span>E-mail: {profile.email}</span>
                  <span>DNI: {profile.dni}</span>
                  <span>Phone: {profile.phone}</span>
                  <span>
                    Address: {profile.address.street} {profile.address.number},{" "}
                    {profile.address.floor}
                  </span>
                  {/* <span>Street: {loggedUser.address.street}</span>
                    <span>Number: {loggedUser.address.number}</span>
                    <span>Floor: {loggedUser.address.floor}</span> */}
                  <span>Birthday: {profile.birthdate}</span>
                  {/* <span>Verify: {loggedUser.state}</span> */}
                  <span>Loyalty points: {profile.loyaltyPoint}</span>
                </div>
              </div>
            </div>

            <div className="formBackx">
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="buttonBackx">Save</button>
              </Link>
            </div>
          </div>

          <div className="contentCategoryx">
            <div className="titleFormx">
              <p>Shopping</p>
            </div>

            <div className="contentCategoryDivx">
              <div className="categoryDivx"></div>
            </div>

            <div className="formBackx">
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="buttonBackx">View All</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDetails;
