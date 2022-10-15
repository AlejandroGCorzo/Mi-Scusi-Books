import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    booksFilter: [],
    detail: {},
    categories: {},
    results: [],
    bookByName: {},
    topTen: [],
  },
  reducers: {
    getAllBooks: (state, action) => {
      state.books = [...action.payload];
      state.booksFilter = [...action.payload];
    },
    getBookById: (state, action) => {
      state.detail = action.payload;
    },
    setEmptyDetail: (state) => {
      state.detail = {};
    },
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
    getBooksFilteredByCat: (state, action) => {
      state.booksFilter = [...action.payload];
    },
    setEmptyBooksFilter: (state) => {
      state.booksFilter = [];
    },
    getBookByName: (state, action) => {
      state.bookByName = state.books.find((b) => b.name === action.payload);
    },
    getTopTen: (state, action) => {
      state.topTen = action.payload;
    },
  },
});

export const {
  getAllBooks,
  getBookById,
  setEmptyDetail,
  allCategories,
  getCategoryResults,
  getBookByName,
  setEmptyBooksFilter,
  getTopTen,
  getBooksFilteredByCat,
} = booksSlice.actions;

export default booksSlice.reducer;
