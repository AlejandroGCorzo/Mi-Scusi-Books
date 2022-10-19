import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedUser: {},
    profile: {},
    login: false,
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getLoggedUserData: (state, action) => {
      state.loggedUser = action.payload;
    },
    setEmptyLoggedUser: (state) => {
      state.loggedUser = {};
    },
    setUserDetails: (state, action) => {
      state.profile = action.payload;
    },
    clearUserDetail: (state) => {
      state.profile = {};
    },
    keepUserLog: (state, action) => {
      state.loggedUser = action.payload;
    },
<<<<<<< HEAD
    setLogin: (state) => {
      state.login = !state.login;
    },
=======
>>>>>>> 57b85a6 (create action delete)
    filterDeleteUser: (state, action) =>{
      state.users = state.users.filter(u=> u._id !== action.payload)
    },
  },
});

<<<<<<< HEAD
export const {
  getAllUsers,
  getLoggedUserData,
  setEmptyLoggedUser,
  setUserDetails,
  clearUserDetail,
  keepUserLog,
  setLogin,
  filterDeleteUser
} = usersSlice.actions;
=======
export const { getAllUsers, getLoggedUserData, setEmptyLoggedUser, setUserDetails,clearUserDetail, keepUserLog, filterDeleteUser } =
  usersSlice.actions;
>>>>>>> 57b85a6 (create action delete)
export default usersSlice.reducer;
