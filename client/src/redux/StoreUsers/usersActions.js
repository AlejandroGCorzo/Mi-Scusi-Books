import axios from "axios";
import { getAllUsers, getLoggedUserData } from "./usersSlice.js";

export const getUser = () => {
  return async (dispatch) => {
    let json = await axios.get("/user");
    return dispatch(getAllUsers(json.data));
  };
};

export const getUserDetail = (data) => {
  return (dispatch) => {
    return dispatch(getLoggedUserData(data));
  };
};
