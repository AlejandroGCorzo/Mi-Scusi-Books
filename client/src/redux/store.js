import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./StoreBooks/booksSlice.js";
import userReducer from "./StoreUsers/usersSlice";
import snackReducer from "./StoreSnackbar/snackSlice.js";

export default configureStore({
  reducer: {
    books: booksReducer,
    users: userReducer,
    snack: snackReducer,
  },
});
