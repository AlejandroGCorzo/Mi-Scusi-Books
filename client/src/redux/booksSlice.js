import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    detail: {},
    users: []
  },
  reducers: {
    getAllBooks: (state, action) => {
      state.books = action.payload;
    },
    getBookById: (state, action) => {
      state.detail = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload
    }
  },
});

export const { getAllBooks, getBookById, getAllUsers } = booksSlice.actions;

export default booksSlice.reducer;
