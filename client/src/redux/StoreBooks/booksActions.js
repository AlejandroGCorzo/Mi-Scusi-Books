import axios from "axios";
import {
  getAllBooks,
  getBookById,
  allCategories,
  getTopTen,
  getBooksFiltered,
  setEmptyBooksFilter,
  setFilters,
  setOrderBooks,
} from "./booksSlice.js";

export const getBooks = () => (dispatch) => {
  axios
    .get("http://localhost:9000/books/allBooks")
    .then((resolve) => dispatch(getAllBooks(resolve.data)))
    .catch((e) => console.log(e));
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`http://localhost:9000/books/${id}`);
    return dispatch(getBookById(json.data));
  };
};

export const getCategories = () => (dispatch) => {
  axios
    .get("http://localhost:9000/category")
    .then((el) => {
      dispatch(allCategories(el.data[0].theme));
    })
    .catch((e) => console.log(e));
};
// // // // FILTROS // // // //
export const bookFiltered = (filters) => (dispatch) => {
  axios
    .post(`http://localhost:9000/books/filter`, filters)
    .then((resolve) => dispatch(getBooksFiltered(resolve.data)))
    .catch((e) => console.log(e));
};

export const setStoreFilters = (filters) => (dispatch) => {
  dispatch(setFilters(filters));
};

export const emptyBookFiltered = () => (dispatch) => {
  dispatch(setEmptyBooksFilter());
};

export const orderFilteredBooks = (value) => (dispatch) => {
  dispatch(setOrderBooks(value));
};
// // // // // // // // // // // //
export const getBookName = (type, value, history) => {
  axios
    .get(`http://localhost:9000/books/filter?type=${type}&value=${value}`)
    .then((resolve) => history.push(`/book_details/${resolve.data[0]._id}`))
    .catch(() => alert("Libro no encontrado"));
};

export const fetchTopTen = () => {
  return async function (dispatch) {
    const top = await axios.get("http://localhost:9000/books");
    dispatch(getTopTen(top.data));
  };
};
