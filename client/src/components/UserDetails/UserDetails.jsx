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
import axios from "axios";

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
  const [imgSelected, setImgSelected] = useState({ file: {}, url: "" });
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
    if (
      e.target.name === "firstName" ||
      e.target.name === "lastName" ||
      e.target.name === "email"
    ) {
      setChanges({ ...changes, [e.target.name]: e.target.value.toLowerCase() });
      validations(
        e.target.name,
        e.target.value.toLowerCase(),
        errors,
        setErrors
      );
      return;
    }
    if (e.target.name === "dni") {
      let dni = e.target.value;
      if (changes.dni && changes.dni.length > e.target.value.length) {
        if (e.target.value.length === 10)
          dni = `${e.target.value.slice(0, 2).replace(".", "")}.${e.target.value
            .slice(2, 6)
            .replace(".", "")}.${e.target.value.slice(6).replace(".", "")}`;
        if (e.target.value.length === 9)
          dni = `${e.target.value.slice(0, 1).replace(".", "")}.${e.target.value
            .slice(1, 5)
            .replace(".", "")}.${e.target.value.slice(5).replace(".", "")}`;
        if (e.target.value.length === 8)
          dni = `${e.target.value.slice(0, 4).replace(".", "")}.${e.target.value
            .slice(4)
            .replace(".", "")}`;
        if (e.target.value.length === 6)
          dni = `${e.target.value.slice(0, 2).replace(".", "")}.${e.target.value
            .slice(2)
            .replace(".", "")}`;
        if (e.target.value.length === 5)
          dni = `${e.target.value.slice(0, 1).replace(".", "")}.${e.target.value
            .slice(1)
            .replace(".", "")}`;
        if (e.target.value.length === 4)
          dni = `${e.target.value.replace(".", "")}`;
      } else {
        if (e.target.value.length === 4)
          dni = `${e.target.value[0]}.${e.target.value.slice(1, 4)}`;
        else if (e.target.value.length === 6)
          dni = `${e.target.value
            .slice(0, 3)
            .replace(".", "")}.${e.target.value.slice(3)}`;
        else if (e.target.value.length === 7)
          dni = `${e.target.value
            .slice(0, 4)
            .replace(".", "")}.${e.target.value.slice(4)}`;
        else if (e.target.value.length === 8)
          dni = `${e.target.value[0]}.${e.target.value
            .slice(1, 5)
            .replace(".", "")}.${e.target.value.slice(5)}`;
        else if (e.target.value.length === 10)
          dni = `${e.target.value.slice(0, 3).replace(".", "")}.${e.target.value
            .slice(3, 7)
            .replace(".", "")}.${e.target.value.slice(7)}`;
        else if (e.target.value.length === 11)
          dni = `${e.target.value.slice(0, 4).replace(".", "")}.${e.target.value
            .slice(4, 8)
            .replace(".", "")}.${e.target.value.slice(8)}`;
      }
      setChanges({ ...changes, [e.target.name]: dni });
      validations(e.target.name, dni, errors, setErrors);
      return;
    }
    if (e.target.name === "phone") {
      let phone =
        e.target.value.length === 1 && e.target.value !== "+"
          ? `+${e.target.value}`
          : e.target.value;
      setChanges({ ...changes, [e.target.name]: phone });
      // validations(e.target.name, phone, errors, setErrors);
      return;
    }
    setChanges({ ...changes, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value, errors, setErrors);
  }
  // // // // // // // //
  // // // // // // // //
  function handleClick(e, boolean) {
    e.preventDefault();
    setEdit(boolean);
    if (boolean) setChanges({ ...profile });
    else {
      setChanges({});
      setErrors({});
    }
  }
  function submitProfileChanges(e) {
    e.preventDefault();
    console.log(profile);
    console.log(changes);
    // changes.phone
    //   ? axios
    //       .get(
    //         `https://api.apilayer.com/number_verification/validate?number=${changes.phone}&apikey=${process.env.REACT_APP_PHONE_NUMBER_VERIFICATION_KEY}`
    //       )
    //       .then((el) => {
    //         if (el.data.valid) {
    //           console.log(el.data);
    //         } else
    //           setErrors({ ...errors, phone: "Must be a valid phone number." });
    //       })
    //   : console.log(changes);
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
              setChanges={setChanges}
              handleTextChange={handleTextChange}
              handleClick={handleClick}
              errors={errors}
              submitProfileChanges={submitProfileChanges}
              imgSelected={imgSelected}
              setImgSelected={setImgSelected}
            />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
