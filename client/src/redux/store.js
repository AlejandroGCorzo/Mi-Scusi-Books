import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.js';

export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
