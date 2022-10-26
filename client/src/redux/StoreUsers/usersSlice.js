import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedUser: {},
    profile: {},
    login: false,
    shoppingCart: [],
    favorites: [],
    bills: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getLoggedUserData: (state, action) => {
      state.loggedUser = action.payload;
      state.shoppingCart = action.payload.cart || [];
      state.favorites = action.payload.favorites || [];
    },
    setEmptyLoggedUser: (state) => {
      state.loggedUser = {};
      state.shoppingCart = [];
      state.favorites = [];
    },
    setUserDetails: (state, action) => {
      state.profile = action.payload;
    },
    clearUserDetail: (state) => {
      state.profile = {};
    },
    keepUserLog: (state, action) => {
      state.loggedUser = action.payload;
      state.shoppingCart = action.payload.cart || [];
      state.favorites = action.payload.favorites || [];
    },
    setLogin: (state) => {
      state.login = !state.login;
    },
    filterDeleteUser: (state, action) => {
      state.users =
        action.payload.state === "limited"
          ? state.users.filter((u) => u.type !== "inactive")
          : state.users.filter((u) => u._id !== action.payload.id);
    },
    setChangeRol: (state, action) => {
      const newAdmin = state.users.find((u) => u._id === action.payload.id);
      newAdmin.type = action.payload.type;
      state.users = [
        ...state.users.filter((e) => e._id !== newAdmin._id),
        newAdmin,
      ];
    },
    setEmptyUsers: (state) => {
      state.users = [];
    },
    getShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    notLogedCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    paymentCompleted: (state) => {
      state.shoppingCart = [];
    },
    allBills: (state, action) => {
      state.bills = action.payload;
    }
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
  filterDeleteUser,
  setChangeRol,
  setEmptyUsers,
  getFavorites,
  getShoppingCart,
  notLogedCart,
  paymentCompleted,
  allBills
} = usersSlice.actions;
export default usersSlice.reducer;
