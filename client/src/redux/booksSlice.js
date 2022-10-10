import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    detail: {},
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
  },
});

export const { getAllBooks, getBookById, setEmptyDetail } = booksSlice.actions;

export default booksSlice.reducer;
