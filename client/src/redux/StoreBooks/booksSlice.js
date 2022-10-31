import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    booksFilter: [],
    storeFilters: {},
    detail: {},
    categories: {},
    results: [],
    bookByName: {},
    topTen: [],
    page: { currentPage: 0, rows: 25 },
    searchBooks: []
  },
  reducers: {
    getAllBooks: (state, action) => {
      state.books = [...action.payload];
      // state.booksFilter = [...action.payload];
      state.searchBooks = state.books
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
    // // // // FILTROS // // // //
    getBooksFiltered: (state, action) => {
      state.booksFilter = [...action.payload];
    },
    setEmptyFilters: (state) => {
      state.storeFilters = {};
      state.booksFilter = [...state.books]
    },
    setOrderBooks: (state, action) => {
      switch (action.payload) {
        case "highest": {
          state.booksFilter = state.booksFilter.sort(
            (a, b) => b.price - a.price
          );
          break;
        }
        case "lowest": {
          state.booksFilter = state.booksFilter.sort(
            (a, b) => a.price - b.price
          );
          break;
        }
        case "rating": {
          state.booksFilter = state.booksFilter.sort(
            (a, b) => b.rating - a.rating
          );
          break;
        }
        case "A": {
          state.booksFilter = state.booksFilter.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
          );
          break;
        }
        case "Z": {
          state.booksFilter = state.booksFilter.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
          );
          break;
        }
      }
    },
    setFilters: (state, action) => {
      state.storeFilters = {
        ...state.storeFilters,
        ...action.payload,
      };
    },
    setEmptyBooksFilter: (state) => {
      state.booksFilter = [];
      state.storeFilters = {};
    },
    // // // // // // // // // // // //
    getBookByName: (state, action) => {
      state.bookByName = state.books.find((b) => b.name === action.payload);
    },
    getTopTen: (state, action) => {
      state.topTen = action.payload;
    },
    currentPage: (state, action) => {
      state.page = action.payload;
    },
    filterDeleteBook: (state, action) => {
      state.books = state.books.filter((b) => b._id !== action.payload);
    },
    setStock: (state, action) => {
      const newStock = state.books.find((b) => b._id === action.payload.id);
      newStock.stock = newStock.stock + Number(action.payload.amount);
      state.books = [...state.books.filter((b) => b._id !== newStock._id),newStock];
    },
    searchBookName: (state, action) => {
      // let filterUsers = [...state.searchUsers]
      state.searchBooks = state.books.filter(u => u.name.includes(action.payload))
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
  getBooksFiltered,
  setFilters,
  setOrderBooks,
  currentPage,
  filterDeleteBook,
  setStock,
  setEmptyFilters,
  searchBookName
} = booksSlice.actions;

export default booksSlice.reducer;
