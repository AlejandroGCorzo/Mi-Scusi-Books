import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    booksFilter: [],
    detail: {},
    categories: {},
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
  },
});

export const {
  getAllBooks,
  getBookById,
  setEmptyDetail,
  allCategories,
  getBooksFilteredByCat,
} = booksSlice.actions;

export default booksSlice.reducer;
