import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snackbar",
  initialState: {
    userRol: false,
    userBlock: false,
    userDelete: false,
    userActive : false,
    bookDelete: false,
    bookStock : false,
  },
  reducers: {
    snackbarBoolean: (state, action) =>{
      state.userRol = action.payload
    },
    snackBlock: (state, action) =>{
      state.userBlock = action.payload
    },
    snackDeleteUser: (state, action) =>{
      state.userDelete = action.payload
    },
    snackDeleteBook: (state, action) =>{
      state.bookDelete = action.payload
    },
    snackStockBook: (state, action) =>{
      state.bookStock = action.payload
    },
    snackActiveUser: (state, action) =>{
      state.userActive = action.payload
    },
  },
});

export const {
  snackbarBoolean,
  snackBlock,
  snackDeleteUser,
  snackDeleteBook,
  snackStockBook,
  snackActiveUser
} = snackSlice.actions;
export default snackSlice.reducer;
