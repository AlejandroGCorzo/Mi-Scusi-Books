import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    detail: {},
    categories: {},
    results: [],
    bookByName: {}
  },
  reducers: {
    getAllBooks: (state, action) => {
      state.books = action.payload;
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
    getCategoryResults: (state, action) => {
      state.results = action.payload
    },
    setEmptyResults: (state) => {
      state.results= [];
    },
    getBookByName: (state,action) =>{
      state.bookByName = state.books.find(b=>b.name === action.payload)
    }
  },
});

export const { getAllBooks, getBookById, setEmptyDetail, allCategories, getCategoryResults, getBookByName,
              setEmptyResults} =

  booksSlice.actions;

export default booksSlice.reducer;
