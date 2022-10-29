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
    forgotPassword : '',
    changePassword : '',
    votedReviews: [],
    votedBooks: [],
    waitingForgot: false
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getLoggedUserData: (state, action) => {
      state.loggedUser = action.payload;
      state.shoppingCart = action.payload.cart || [];
      state.favorites = action.payload.favorites || [];
      state.votedReviews = action.payload.votedReviews || [];
      state.votedBooks = action.payload.votedBooks || [];
    },
    setEmptyLoggedUser: (state) => {
      state.loggedUser = {};
      state.shoppingCart = [];
      state.favorites = [];
      state.votedReviews = [];
      state.votedBooks = [];
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
      state.votedReviews = action.payload.votedReviews || [];
      state.votedBooks = action.payload.votedBooks || [];
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
    },
    forgotPassword: (state, action) => {
      state.forgotPassword = action.payload
    },
    changePassword: (state, action) => {
      state.changePassword = action.payload
    },
    changeBillStatus: (state, action) =>{
      const newStatus = state.bills.find((b) => b._id === action.payload.id);
      newStatus.status = action.payload.status
      state.bills = [...state.bills.filter((e) => e._id !== newStatus._id), newStatus]
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
  allBills,
  forgotPassword,
  changePassword,
  changeBillStatus
} = usersSlice.actions;
export default usersSlice.reducer;
