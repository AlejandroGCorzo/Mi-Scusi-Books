import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import colorMiScusi from "../Palettes/GreenColor.jsx"; // Paleta para color verde
import { ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import TestUsers from "./UsersTable/UsersNewTable.jsx";

import BookNewTable from "./BooksTable/BookNewTable.jsx";
import BooksStock from "./BooksTable/BookStockTable.jsx";

import { getUser } from "../../redux/StoreUsers/usersActions.js";
import { getBooks } from "../../redux/StoreBooks/booksActions.js";
import { setEmptyUsers } from "../../redux/StoreUsers/usersSlice.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const dispatch = useDispatch();
  // const accessToken =
  //   window.localStorage.getItem("token") ||
  //   window.sessionStorage.getItem("token");

  // useEffect(() => {
  //   dispatch(getUser(accessToken));
  //   dispatch(getBooks());
  //   return (()=> dispatch(setEmptyUsers()))
  // }, [dispatch]);

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedUser } = useSelector((state) => state.users);
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (loggedUser?.type === "normal") history.push("/"); 
    dispatch(getUser(accessToken));
    dispatch(getBooks());
    return (()=> dispatch(setEmptyUsers()))
  }, [dispatch,loggedUser]);

  return (
    <Box sx={{ width: "100%" }}>
      {loggedUser?.type === "admin" || loggedUser?.type === "seller" ? (
        <ThemeProvider theme={colorMiScusi}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="primary"
              indicatorColor="primary"
              centered
            >
              <Tab label="Users New Table" {...a11yProps(0)} />
              <Tab label="Books New Table" {...a11yProps(1)} />
              <Tab label="Books Stock" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TestUsers />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BookNewTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BooksStock/>
          </TabPanel>
        </ThemeProvider>
      ) : null }
    </Box>
  );
}
