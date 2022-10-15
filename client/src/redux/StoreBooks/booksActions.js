import axios from 'axios';
import {
  getAllBooks,
  getBookById,
  allCategories,
  getCategoryResults,
  getBookByName,
  getTopTen
} from './booksSlice.js';

export const getBooks = () => {
  return async (dispatch) => {
    let json = await axios.get('http://localhost:9000/books/allBooks');
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
  axios.get('http://localhost:9000/category').then((el) => {
    dispatch(allCategories(el.data[0].theme));
  });
};

export const getResults = (type, value) => {
  return async (dispatch) => {
    let json = await axios.get(
      `http://localhost:9000/books/filter?type=${type}&value=${value}`
    );
    return dispatch(getCategoryResults(json.data));
  };
};

export const getBookName = (type, value, history) => {
  axios
    .get(`http://localhost:9000/books/filter?type=${type}&value=${value}`)
    .then((resolve) => history.push(`/book_details/${resolve.data[0]._id}`))
    .catch(() => alert('Libro no encontrado'));
};

export const fetchTopTen =  () => {
  return async function(dispatch){
    const top = await axios.get('http://localhost:9000/books')
    dispatch(getTopTen(top.data))
  }
}