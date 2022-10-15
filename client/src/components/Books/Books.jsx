import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getResults,
  getCategories,
  getBooks,
} from '../../redux/StoreBooks/booksActions.js';
import Book from '../Book/Book.jsx';
import './Books.css';
// import { setEmptyResults } from '../../redux/StoreBooks/booksSlice.js';

export default function Books() {
  // // // // // //
  const dispatch = useDispatch();
  // // // // // //
  // const { type, value } = useParams(); //type=category, value=medicine
  const { booksFilter, categories } = useSelector((state) => state.books);
  const currentBooks = booksFilter.slice(0, 8);

  // // // // // // STATES CREADOS POR ALE
  const [filters, setFilters] = useState({});
  const { theme, category, subcategory } = useParams();
  // // // // // // // // // // // // // //

  useEffect(() => {
    if (!theme || !category || !subcategory) {
      dispatch(getBooks());
    }
    // dispatch(getResults(type, value));
    dispatch(getCategories());
    return () => {
      // dispatch(setEmptyResults());
    };
  }, [dispatch]);

  function handleClick(e, type, value) {
    e.preventDefault();
    // dispatch(getResults(type, value));
  }

  return (
    <div className="contentResults">
      <div className="divLinkCategories">
        <p className="linkCategories">
          <Link to={'/categories'} style={{ textDecoration: 'none' }}>
            Books
          </Link>
          {/* <b>{value ? ` --> ${value}` : null}</b> */}
        </p>
      </div>
      <div className="resultsMain">
        <div className="filtersResults">
          <div className="titleResults">
            <p>FILTERS</p>
          </div>
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Subcategories</p>
            </b>
            {/* {results?.map((b) => (
              <label>
                <input type="checkbox" id={b._id} value={`${b.author}cb`} />{" "}
                {b.category}
              </label>
            ))} */}
          </div>
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Author</p>
            </b>
            {booksFilter?.map((b) => (
              <p
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleClick(e, 'author', b.author)}
              >
                {b.author[0].toLocaleUpperCase() + b.author.slice(1)}
              </p>
            ))}
          </div>
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Editorial</p>
            </b>
            {booksFilter?.map((b) => (
              <p
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleClick(e, 'editorial', b.editorial)}
              >
                {b.editorial[0].toLocaleUpperCase() + b.editorial.slice(1)}
              </p>
            ))}
          </div>
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Language</p>
            </b>
            {booksFilter?.map((b) => (
              <p
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleClick(e, 'language', b.language)}
              >
                {b.language[0].toLocaleUpperCase() + b.language.slice(1)}
              </p>
            ))}
          </div>
        </div>
        <div className="sectionBooksResults">
          <div className="titleResults">
            {/* <p>{`There's ${results.length} results in ${value}`}</p> */}
          </div>
          {/* <p>
            <label>Order by </label>
            <select className="selectResults">
              <option value="all">All</option>
              <option value="lowprice">Low to high price</option>
              <option value="highprice">High to low price</option>
              <option value="news">Newest arrivals</option>
              <option value="rating">Rating</option>
            </select>
          </p> */}
          {currentBooks.length > 0 &&
            currentBooks.map((b) => {
              return (
                <div className="cardBookResults" key={b._id}>
                  <Book
                    image={b.image}
                    name={b.name}
                    author={b.author}
                    price={b.price}
                    _id={b._id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
