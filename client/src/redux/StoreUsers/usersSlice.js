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
    setLogin: (state) => {
      state.login = !state.login;
    },
    filterDeleteUser: (state, action) =>{
      state.users = state.users.filter(u=> u._id !== action.payload)
    },
  },
});

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
export default usersSlice.reducer;
