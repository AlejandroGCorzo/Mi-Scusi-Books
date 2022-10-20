import axios from "axios";
import {
  getAllUsers,
  getLoggedUserData,
  setUserDetails,
  keepUserLog,
  filterDeleteUser,
  setLogin,
} from "./usersSlice.js";

export const getUser = (token) => {
  return async (dispatch) => {
    let json = await axios.get("/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
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

export const setUserDelete = (id, state, token) => {
  return async (dispatch) => {
    let json = await axios.put(`/user/sanction/${id}`, {state}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(filterDeleteUser(id));
  };
};

export const loging = () => (dispatch) => {
  dispatch(setLogin());
};
