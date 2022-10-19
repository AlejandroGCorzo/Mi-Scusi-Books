import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./HeaderNav.css";
import userIcon from "../../sourceImg/user.svg";
import userShopping from "../../sourceImg/shopping-cart.svg";
import { getLoggedUser, keepLog } from "../../redux/StoreUsers/usersActions.js";
import { setEmptyLoggedUser } from "../../redux/StoreUsers/usersSlice.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

////////////Material UI/////////////////////
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
/////////////////////////////////////////////

export default function HeaderNav(onSearch) {
  ////////////Material UI/////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /////////////////////////////////////////////

  // const [reload, setReload] = useState(false);

  const { loggedUser, login } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const { loginWithPopup, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("/user/login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleLoggin = async (e) => {
    e.preventDefault();
    history.push("/login")
    // await loginWithPopup();
    // const user = dispatch(getLoggedUser(await callProtectedApi()));
    // console.log(user);
    // window.localStorage.setItem("token", user.payload.token);
    // console.log(user.payload);
    // if (user.payload.id) history.push("/user_details");
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    dispatch(setEmptyLoggedUser());
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(keepLog(accessToken));
    }
  }, [dispatch, login]);

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <p>Mi Scusi Books</p>
        </div>
      </Link>

      <SearchBar onSearch={onSearch} />

      <div>
        {isAuthenticated || loggedUser.id ? (
          <div className="iconsContainer">
            {/* <span onClick={handleLogOut}>Logout</span>
            <Link to="/userDetails">
              <p>Profile</p>
            </Link> */}
            <p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <HomeIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p>
              <Link to="/shopping/cart" style={{ textDecoration: "none" }}>
                <ShoppingCartIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p>
              <Link to="/shopping/favorite" style={{ textDecoration: "none" }}>
                <FavoriteIcon style={{ color: "white" }} />
              </Link>
            </p>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <img
                    src={loggedUser.picture}
                    style={{ width: 32, height: 32, "border-radius": "30px" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link
                to={`/user_details/${loggedUser.id}`}
                style={{ "text-decoration": "none", color: "#5b5b5b" }}
              >
                <MenuItem>
                  {/* <img
                    src={loggedUser.picture}
                    style={{ width: 32, height: 32, "border-radius": "30px" }}
                  />
                  <Avatar /> */}
                  Profile
                </MenuItem>
              </Link>
              { loggedUser.type === "admin" ? (
                <Link
                  to="/admin_panel"
                  style={{ "text-decoration": "none", color: "#5b5b5b" }}
                >
                  <MenuItem>Dashboard</MenuItem>
                </Link>
              ) : null}
              <Divider />
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>

            {/* <Link to="/store">
              <img src={userShopping} alt="" />
            </Link> */}
          </div>
        ) : (
          <div className="iconsContainer">
            <p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <HomeIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p>
              <Link to="/shopping/cart" style={{ textDecoration: "none" }}>
                <ShoppingCartIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p>
              <Link to="/shopping/favorite" style={{ textDecoration: "none" }}>
                <FavoriteIcon style={{ color: "white" }} />
              </Link>
            </p>
            <p onClick={handleLoggin} style={{ cursor: "pointer" }}>
              Log in
            </p>

            {/* <Link to="/login" style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link> */}
            {/* <Link to="/create" style={{ textDecoration: "none" }}>
              <p>Sign Up</p>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}
