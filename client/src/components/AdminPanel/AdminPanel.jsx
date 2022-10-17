import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UsersTable from "./UsersTable/UsersTable.jsx";
import BooksTable from "./BooksTable/BooksTable.jsx";

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


  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getUser());
  //   }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
        {loggedUser?.type === 'admin' ? 
        <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
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
        <BooksTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Futures Payments
      </TabPanel>
      </>
      : <span>No sos admin wacho!!</span>}
    </Box>
  );
}
