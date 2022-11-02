import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getUserDetails,
  getUserBills,
} from "../../redux/StoreUsers/usersActions";
import { clearUserDetail, clearBills } from "../../redux/StoreUsers/usersSlice";
import "./UserDetails.css";
import Profile from "./Profile/Profile.jsx";
import TransactionHistory from "./TransactionsHistory/TransactionsHistory";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ThemeProvider } from "@mui/material/styles";
import colorMiScusi from "../Palettes/GreenColor.jsx"; // Paleta para color verde
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import DigitalBooks from "./DigitalBooks/DigitalBooks";
import ChatBot from "../ChatBot/ChatBot";
import DialogConfirmEdit from "./DialogConfirmEdit/DialogConfirmEdit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function UserDetails(props) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile, bills, loggedUser } = useSelector((store) => store.users);

  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  // // // // // // // // // // // // // //
  const [tab, setTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const [changes, setChanges] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

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
    <div className="contentCategory">
      <Box sx={{ width: "100%" }}>
        <ThemeProvider theme={colorMiScusi}>
          <div className="titleFormProfileDetail">
            <BottomNavigation
              showLabels
              value={value}
              className="bottomNavigation"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Profile"
                icon={<AccountCircleIcon />}
              />

              <BottomNavigationAction
                label="Transaction History"
                icon={<HistoryIcon />}
              />

              <BottomNavigationAction
                label="My Digital Books"
                icon={<MenuBookIcon />}
              />
            </BottomNavigation>
          </div>
        </ThemeProvider>

        <div className="contentShoppingDetail">
          <div className="itemsShoppingDetail">
            <TabPanel value={value} index={0} className="tabPanel">
              <Profile
                profile={profile}
                edit={edit}
                setEdit={setEdit}
                changes={changes}
                setChanges={setChanges}
                errors={errors}
                setErrors={setErrors}
                dispatch={dispatch}
                token={token}
                handleClick={handleClick}
              />
            </TabPanel>

            <TabPanel value={value} index={1} className="tabPanel">
              <TransactionHistory bills={bills} userId={props.match.params.id} />
            </TabPanel>

            <TabPanel value={value} index={2} className="tabPanel">
              {/* {console.log(bills)} */}
              <DigitalBooks loggedUser={loggedUser} />
            </TabPanel>
          </div>
        </div>

        <div className="formBackx">
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="buttonBack">Back</button>
            <button
              className="buttonBack delete"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Delete Account
            </button>
          </Link>
        </div>
      </Box>

      <DialogConfirmEdit
        open={open}
        setOpen={setOpen}
        id={profile._id}
        email={profile.email}
        history={history}
        token={token}
        dispatch={dispatch}
      />
    </div>
  );
}
