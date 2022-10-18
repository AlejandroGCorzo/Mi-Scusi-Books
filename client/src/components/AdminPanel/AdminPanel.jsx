import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UsersTable from "./UsersTable/UsersTable.jsx";
import BooksTable from "./BooksTable/BooksTable.jsx";
import colorMiScusi from "../Palettes/GreenColor.jsx"; // Paleta para color verde
import { ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { getUser } from "../../redux/StoreUsers/usersActions.js";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loggedUser } = useSelector((state) => state.users);
  const history = useHistory();

  useEffect(() => {
    if (loggedUser?.type !== "admin") history.push("/");
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {loggedUser?.type === "admin" ? (
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
              <Tab label="Users" {...a11yProps(0)} />
              <Tab label="Books" {...a11yProps(1)} />
              <Tab label="Payments" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <UsersTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BooksTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Futures Payments
          </TabPanel>
        </ThemeProvider>
      ) : (
        <span>No sos admin</span>
      )}
    </Box>
  );
}
