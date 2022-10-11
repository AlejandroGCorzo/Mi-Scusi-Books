import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
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
      state.detail = state.books.find((e) => e._id === action.payload);
    },
    setEmptyDetail: (state) => {
      state.detail = {};
    },
    getAllUsers: (state, action) => {
      state.users = action.payload
    }
  },
});

export const { getAllBooks, getBookById, setEmptyDetail, getAllUsers } = booksSlice.actions;

export default booksSlice.reducer;
