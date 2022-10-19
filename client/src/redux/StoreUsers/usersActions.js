import axios from "axios";
import { getAllUsers, getLoggedUserData, setUserDetails, filterDeleteUser } from "./usersSlice.js";

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
    try{
      const details = await axios.get(`/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      return dispatch(setUserDetails(details.data))
    } catch (e){
      return dispatch(setUserDetails(e.response.data))
    }
  }
}

export const setUserDelete = (id) => {
  return async (dispatch) => {
    let json = await axios.put(`/user/delete/${id}`);
    return dispatch(filterDeleteUser(id));
  };
};