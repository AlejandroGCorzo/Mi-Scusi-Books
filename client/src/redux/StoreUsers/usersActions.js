import axios from "axios";
import {
  getAllUsers,
  getLoggedUserData,
  setUserDetails,
  keepUserLog, filterDeleteUser,
  setLogin,
} from "./usersSlice.js";

export const getUser = () => {
  return async (dispatch) => {
    let json = await axios.get("/user");
    return dispatch(getAllUsers(json.data));
  };
};

export const getLoggedUser = (data) => {
  return (dispatch) => {
    return dispatch(getLoggedUserData(data));
  };
};

export const getUserDetails = (id, token) => {
  return async (dispatch) => {
    try {
      const details = await axios.get(`/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setUserDetails(details.data));
    } catch (e) {
      return dispatch(setUserDetails(e.response.data));
    }
  };
};

export const keepLog = (token) => {
  return async (dispatch) => {
    try {
      const user = await axios.get("/user/keepLog", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(keepUserLog(user.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loging = () => (dispatch) => {
  dispatch(setLogin());
};

export const setUserDete = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`/user/delete/${id}`);
    return dispatch(filterDeleteUser(id));
  };
};