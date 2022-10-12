import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './StoreBooks/booksSlice.js';
import userReducer  from './StoreUsers/usersSlice';

export default configureStore({
  reducer: {
    books: booksReducer,
    users: userReducer
  },
});
