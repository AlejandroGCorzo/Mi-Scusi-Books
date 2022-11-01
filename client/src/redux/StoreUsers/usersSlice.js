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
    forgotPassword: "",
    changePassword: "",
    votedReviews: [],
    votedBooks: [],
    waitingForgot: false,
    searchUsers: [],
    shippingAddress:{},
    reports: [],
    report: {}
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
      state.searchUsers = state.users;
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
      console.log(action.payload.state);
      if(action.payload.state === 'limited' || action.payload.state === 'active'){
        const newState = state.users.find((u) => u._id === action.payload.id);
        newState.state = action.payload.state;
        state.users = [...state.users.filter((e) => e._id !== newState._id), newState]
      } else{
        state.users = state.users.filter((u) => u._id !== action.payload.id)
      }
      state.searchUsers = state.users;
    },
    setChangeRol: (state, action) => {
      const newAdmin = state.users.find((u) => u._id === action.payload.id);
      newAdmin.type = action.payload.type;
      state.users = [
        ...state.users.filter((e) => e._id !== newAdmin._id),
        newAdmin,
      ];
      state.searchUsers = state.users;
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
    userBills: (state, action) => {
      state.bills = action.payload;
    },
    clearBills: (state, action) => {
      state.bills = [];
    },
    forgotPassword: (state, action) => {
      state.forgotPassword = action.payload;
    },
    changePassword: (state, action) => {
      state.changePassword = action.payload;
    },
    changeBillStatus: (state, action) => {
      const newStatus = state.bills.find((b) => b._id === action.payload.id);
      newStatus.status = action.payload.status;
      state.bills = [
        ...state.bills.filter((e) => e._id !== newStatus._id),
        newStatus,
      ];
    },
    searchEmail: (state, action) => {
      // let filterUsers = [...state.searchUsers]
      state.searchUsers = state.users.filter(u => u.email.includes(action.payload))
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = {}
    },
    getReports: (state, action) => {
      state.reports = action.payload
    },
    clearReports: (state) => {
      state.reports = []
    },
    sendReport: (state, action) => {
      state.report = action.payload
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
  changeBillStatus,
  userBills,
  clearBills,
  searchEmail,
  getReports,
  clearReports,
  sendReport,
  setShippingAddress,
  clearShippingAddress
} = usersSlice.actions;
export default usersSlice.reducer;
