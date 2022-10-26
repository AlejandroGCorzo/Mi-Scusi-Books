import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserDetails } from "../../redux/StoreUsers/usersActions";
import { clearUserDetail } from "../../redux/StoreUsers/usersSlice";
import "./UserDetails.css";
import { Box, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Profile from "./Profile/Profile.jsx";
import validations from "./Validations/validations.js";

export default function UserDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile } = useSelector((store) => store.users);
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  // // // // // // // // // // // // // //

  // // // // // // // // // // // //
  const [tab, setTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const [changes, setChanges] = useState({});
  const [errors, setErrors] = useState({});
  const handleTab = (e, newValue) => {
    setTab(newValue);
  };
  // // // // // // // // // // // //

  // // // // USE EFFECT // // // //
  useEffect(() => {
    if (!token || profile.msg) {
      history.push("/");
    } else {
      dispatch(getUserDetails(props.match.params.id, token));
    }
    // console.log(profile);
    return () => {
      dispatch(clearUserDetail());
    };
  }, [dispatch]);
  // // // // // // // // // // // //
  function handleTextChange(e) {
    setChanges({ ...changes, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value, errors, setErrors);
  }
  function handleClick(boolean) {
    setEdit(boolean);
    boolean ? setChanges({ ...profile }) : setChanges({});
  }
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              onChange={handleTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Profile" value="1" />
              <Tab label="Purchase History" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Profile
              profile={profile}
              edit={edit}
              changes={changes}
              handleTextChange={handleTextChange}
              handleClick={handleClick}
            />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </>
  );

  // return (
  //   <>
  //     {profile._id ? (
  //       <div className="userOuterDiv">
  //         <div className="contentCategoryx">
  //           <div className="titleFormx">
  //             <p>Profile</p>
  //             <button className="pencilButtonx">✎</button>
  //           </div>

  //           <div className="contentCategoryDivx">
  //             <div className="categoryDivx">
  //               <div className="userImage">
  //                 <img src={profile.image} referrerPolicy="no-referrer" />
  //               </div>

  //               <div className="userInfoContainer">
  //                 <span>Username: {profile.username}</span>
  //                 <span>Name: {profile.firstName}</span>
  //                 <span>Last Name: {profile.lastName}</span>
  //                 <span>E-mail: {profile.email}</span>
  //                 <span>DNI: {profile.dni}</span>
  //                 <span>Phone: {profile.phone}</span>
  //                 <span>
  //                   Address: {profile.address.street} {profile.address.number},{" "}
  //                   {profile.address.floor}
  //                 </span>
  //                 {/* <span>Street: {loggedUser.address.street}</span>
  //                   <span>Number: {loggedUser.address.number}</span>
  //                   <span>Floor: {loggedUser.address.floor}</span> */}
  //                 <span>Birthday: {profile.birthdate}</span>
  //                 {/* <span>Verify: {loggedUser.state}</span> */}
  //                 <span>Loyalty points: {profile.loyaltyPoint}</span>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="formBackx">
  //             <Link to="/" style={{ textDecoration: "none" }}>
  //               <button className="buttonBackx">Save</button>
  //             </Link>
  //           </div>
  //         </div>

  //         <div className="contentCategoryx">
  //           <div className="titleFormx">
  //             <p>Shopping</p>
  //           </div>

  //           <div className="contentCategoryDivx">
  //             <div className="categoryDivx"></div>
  //           </div>

  //           <div className="formBackx">
  //             <Link to="/" style={{ textDecoration: "none" }}>
  //               <button className="buttonBackx">View All</button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     ) : (
  //       <></>
  //     )}
  //   </>
  // );
}
