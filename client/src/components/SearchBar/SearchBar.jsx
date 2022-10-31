import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import Search from "../../sourceImg/search.svg";
import { getBookByName, setEmptyFilters } from "../../redux/StoreBooks/booksSlice";
import {
  getBookName,
  bookFiltered,
  setStoreFilters,
  emptyBookFiltered,
} from "../../redux/StoreBooks/booksActions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";

export default function SearchBar() {
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("name");
  const dispatch = useDispatch();
  const history = useHistory();

  const { loggedUser } = useSelector((state) => state.users); // Se usa para no renderizarle el create a todos los users
  
  const { bookByName } = useSelector((state) => state.books);
  const { books } = useSelector((state) => state.books);
  // const { detail } = useSelector((state) => state.books);

  function handleInputChange(e) {
    setName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    dispatch(emptyBookFiltered());
    let search;
    filter === "author"
      ? (search = { [filter]: [name.trim()] })
      : (search = { [filter]: name.trim() });
    dispatch(setStoreFilters(search));
    dispatch(bookFiltered(search));
    history.push(`/books`);
    setName("");
  }

  function changeFilter(e) {
    setFilter(e.target.value);
  }

  function handleClick(e){
    dispatch(setEmptyFilters());
    history.push("/books");
  }

  return (
    <div>
      <div className="search">
        <input
          style={{ textTransform: "capitalize" }}
          autoComplete="off"
          id="Searching"
          className="searchTerm"
          type="text"
          value={name}
          placeholder="Search..."
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              return handleSubmit();
            }
          }}
          pattern="^[A-Za-z\s]+$"
          maxLength="30"
        />
        <select className="searchSelect" onChange={changeFilter}>
          <option value="name">Title</option>
          <option value="editorial">Editorial</option>
          <option value="author">Author</option>
          <option value="ISBN">ISBN</option>
        </select>
        <button className="searchButton" type="submit" onClick={handleSubmit}>
          <img src={Search} alt="imgType" width="24px" height="24px" />
        </button>

      </div>
      <div className="headerLow">
        {loggedUser?.type === "admin" || loggedUser?.type === "seller" ? 
            <Link to="/create" style={{ textDecoration: "none" }}>
                <p className="noRomper" onClick={() => window.sessionStorage.removeItem('bookDetail')}>Add Book</p>
            </Link>
          : null}
            {/* <Link to="/books" style={{ textDecoration: "none" }}>
                <p>All Books</p>
            </Link> */}
            <p className="noRomper" onClick={handleClick} style={{cursor: "pointer"}}>All Books</p>
            <Link to="/categories" style={{ textDecoration: "none" }}>
                <p className="noRomper">Categories</p>
          </Link>
          </div>
    </div>
  );
}


