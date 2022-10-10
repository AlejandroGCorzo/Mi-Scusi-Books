import { configureStore } from '@reduxjs/toolkit';
import books from './booksSlice.js';

export default configureStore({
  reducer: {
    books: books,
  },
});
