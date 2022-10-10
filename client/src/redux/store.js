import { configureStore } from '@reduxjs/toolkit';
import books from './characterSlice.js';

export default configureStore({
  reducer: {
    books: books,
  },
});
