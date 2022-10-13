import axios from "axios";
import {
  getAllBooks,
  getBookById,
  allCategories,
  getCategoryResults,
} from "./booksSlice.js";

export const getBooks = () => {
  return async (dispatch) => {
    let json = await axios.get("http://localhost:9000/books/allBooks");
    return dispatch(getAllBooks(json.data));
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`http://localhost:9000/books/${id}`);
    return dispatch(getBookById(json.data));
  };
};

export const getCategories = () => (dispatch) => {
  axios.get("http://localhost:9000/category").then((el) => {
    dispatch(allCategories(el.data[0].theme));
  });
};

export const getResults = (category) => {
  return async (dispatch) => {
    let json = await axios.get(
      `http://localhost:9000/books/filter?category=${category}`
    );
    return dispatch(getCategoryResults(json.data));
  };
};
