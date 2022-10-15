import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';
import Search from '../../sourceImg/search.svg';
import { getBookByName } from '../../redux/StoreBooks/booksSlice';
import { getBookName } from '../../redux/StoreBooks/booksActions';
import { useHistory } from 'react-router-dom';

// import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";

export default function SearchBar() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const { bookByName } = useSelector((state) => state.books);
  const { books } = useSelector((state) => state.books);

  // const { detail } = useSelector((state) => state.books);

  function handleInputChange(i) {
    setName(i.target.value);
  }

  function handleSubmit(i) {
    i.preventDefault();
    const type = 'name';
    getBookName(type, name, history);
    setName('');
  }

  return (
    <div>
      <div className="search">
        <input
          id="Searching"
          className="searchTerm"
          type="text"
          value={name}
          placeholder="Search..."
          onChange={handleInputChange}
          pattern="^[A-Za-z\s]+$"
          maxLength="30"
        />

        <button className="searchButton" type="submit" onClick={handleSubmit}>
          <img src={Search} alt="imgType" width="24px" height="24px" />
        </button>
      </div>
    </div>
  );
}
