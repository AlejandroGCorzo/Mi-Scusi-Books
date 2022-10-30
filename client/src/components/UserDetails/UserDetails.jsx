import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getUserDetails,
  getUserBills,
} from "../../redux/StoreUsers/usersActions";
import { clearUserDetail, clearBills } from "../../redux/StoreUsers/usersSlice";
import "./UserDetails.css";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Profile from "./Profile/Profile.jsx";
import TransactionHistory from "./TransactionsHistory/TransactionsHistory";

export default function UserDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile, bills } = useSelector((store) => store.users);
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  // // // // // // // // // // // // // //
  const [tab, setTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const [changes, setChanges] = useState({});
  const [errors, setErrors] = useState({});
  const [imgSelected, setImgSelected] = useState({ file: {}, url: "" });
  const handleTab = (e, newValue) => {
    setTab(newValue);
  };
  // // // // // USE EFFECT // // // // //
  useEffect(() => {
    if (!token || profile.msg) {
      history.push("/");
    } else {
      dispatch(getUserBills(props.match.params.id, token));
      dispatch(getUserDetails(props.match.params.id, token));
    }
    return () => {
      dispatch(clearUserDetail());
      dispatch(clearBills());
    };
  }, [dispatch]);
  // // // // // // // // // // // //
  function handleClick(e, boolean) {
    e.preventDefault();
    setEdit(boolean);
    if (boolean) setChanges({ ...profile });
    else {
      setChanges({});
      setErrors({});
    }
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
              <Tab label="profile" value="1" />
              <Tab label="transaction history" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Profile
              profile={profile}
              edit={edit}
              setEdit={setEdit}
              changes={changes}
              setChanges={setChanges}
              handleClick={handleClick}
              errors={errors}
              setErrors={setErrors}
              dispatch={dispatch}
              token={token}
              imgSelected={imgSelected}
              setImgSelected={setImgSelected}
            />
          </TabPanel>
          <TabPanel value="2">
            <TransactionHistory bills={bills} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
