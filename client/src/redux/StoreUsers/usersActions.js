import axios from "axios";
import { getAllUsers, getLoggedUserData } from "./usersSlice.js";

// import { useAuth0 } from "@auth0/auth0-react";
// const { getAccessTokenSilently } = useAuth0();

export const getUser = () => (dispatch) => {
  dispatch(
    getAllUsers([
      {
        email: "juanfledesma18@gmail.com",
        password: 12345,
      },
      {
        email: "janonanzer@gmail.com",
        password: 12345,
      },
      {
        email: "alejandrogcorzo@gmail.com",
        password: 12345,
      },
      {
        email: "cassiram15@gmail.com",
        password: 12345,
      },
      {
        email: "mgutierrezxred@gmail.com",
        password: 12345,
      },
      {
        email: "agustinnicolas12340@gmail.com",
        password: 12345,
      },
      {
        email: "ricaudjuan11@gmail.com",
        password: 12345,
      },
    ])
  );
};

export const getUserDetail = (data) => {
  return (dispatch) => {
    return dispatch(getLoggedUserData(data));
  };
};
