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
  currentPage,
  filterDeleteBook,
  setStock,
  searchBookName
} from "./booksSlice.js";

export const getBooks = () => (dispatch) => {
  axios
    .get("/books/allBooks")
    .then((resolve) => dispatch(getAllBooks(resolve.data)))
    .catch((e) => console.log(e));
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`/books/${id}`);
    return dispatch(getBookById(json.data));
  };
};

export const getCategories = () => (dispatch) => {
  axios
    .get("/category")
    .then((el) => {
      dispatch(allCategories(el.data[0].theme));
    })
    .catch((e) => console.log(e));
};

export const fetchTopTen = () => {
  return async function (dispatch) {
    const top = await axios.get("/books");
    dispatch(getTopTen(top.data));
  };
};

// // // // FILTROS // // // //
//
export const bookFiltered = (filters) => (dispatch) => {
  axios
    .post(`/books/filter`, filters)
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
export const setCurrentPage = (value) => (dispatch) => {
  dispatch(currentPage(value))
}
// // // // // // // // // // // // DESACTUALIZADAS
//
// export const getBookName = (type, value, history) => {
//   axios
//     .get(`/books/filter?type=${type}&value=${value}`)
//     .then((resolve) => history.push(`/book_details/${resolve.data[0]._id}`))
//     .catch(() => alert("Libro no encontrado"));
// };

export const setBookDelete = (id, token) => {
  return async (dispatch) => {
    let json = await axios.put(`/books/delete/${id}`, {} , {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(filterDeleteBook(id));
  };
};

export const setBookStock = (id, amount, token) => {
  return async (dispatch) => {
    let json = await axios.put(`/books/stock/${id}`,{amount}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setStock({id,amount}));
  };
};

/////////////////////////REVIEWS///////////////////////
export const addReview = (text, idUser, idBook, rating) => {
  return async (dispatch) => {
    const asd = await axios.post("/review", { text, idUser, idBook, rating });
    return dispatch(getDetail(idBook));
  };
};

export const addVote = (id, idBook, vote, token) => {
  return async (dispatch) => {
    const asd = await axios.put(`/review/vote/${id}`, { vote}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(getDetail(idBook));
  };
};

export const removeVote = (id, idBook, vote, token) => {
  return async (dispatch) => {
    const asd = await axios.put(`/review/vote/remove/${id}`, { vote}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(asd.data);
    return dispatch(getDetail(idBook));
  };
};

export const searchBookByName = (book) => {
  return (dispatch) => {
    return dispatch(searchBookName(book));
  };
};