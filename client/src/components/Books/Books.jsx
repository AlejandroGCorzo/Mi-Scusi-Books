import React, { useEffect, useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  // getResults,
  bookFiltered,
  getCategories,
  getBooks,
  emptyBookFiltered,
  setStoreFilters,
} from "../../redux/StoreBooks/booksActions.js";
import Book from "../Book/Book.jsx";
import UrlBreadcrumb from "./UrlBreadcrumb/UrlBreadcrumb.jsx";
import FilterCategories from "./FilterCategories/FilterCategories.jsx";
import "./Books.css";

export default function Books() {
  // // // // // //
  const history = useHistory();
  const dispatch = useDispatch();
  // // // // // //
  // const { type, value } = useParams(); //type=category, value=medicine
  const { booksFilter, categories, storeFilters } = useSelector(
    (state) => state.books
  );
  // const currentBooks = booksFilter.slice(0, 8);

  // // // // // // STATES CREADOS POR ALE
  // const [filters, setFilters] = useState({});
  let { theme, category, subcategory } = useParams();
  theme = theme?.replace(/\_/g, " ");
  category = category?.replace(/\_/g, " ");
  subcategory = subcategory?.replace(/\_/g, " ");

  // // // // // // // // // // // // // //

  useEffect(() => {
    if (!theme && !category && !subcategory) {
      dispatch(bookFiltered(storeFilters));
    }
    if (theme && !category && !subcategory) {
      dispatch(setStoreFilters({ category: [theme] }));
      // dispatch(bookFiltered({ category: [theme] }));
      setTimeout(() => dispatch(bookFiltered(storeFilters)), 250);
    }
    if (theme && category && !subcategory) {
      dispatch(setStoreFilters({ category: [theme, category] }));
      // dispatch(bookFiltered({ category: [theme, category] }));
      setTimeout(() => dispatch(bookFiltered(storeFilters)), 250);
    }
    if (theme && category && subcategory) {
      dispatch(setStoreFilters({ category: [theme, category, subcategory] }));
      // dispatch(bookFiltered({ category: [theme, category, subcategory] }));
      setTimeout(() => dispatch(bookFiltered(storeFilters)), 250);
    }
    dispatch(getCategories());

    return () => {
      dispatch(emptyBookFiltered());
    };
  }, [dispatch, theme, category, subcategory]);

  function handleClick(e, type, value) {
    e.preventDefault();
    if (type === "author") dispatch(setStoreFilters({ [type]: [value] }));
    // dispatch(getResults(type, value));
  }
  // // // // // //
  return (
    <div className="contentResults">
      <div className="divLinkCategories">
        <div className="linkCategories">
          <UrlBreadcrumb
            theme={theme}
            category={category}
            subcategory={subcategory}
            dispatch={dispatch}
            setStoreFilters={setStoreFilters}
          />
        </div>
      </div>
      <div className="resultsMain">
        <div className="filtersResults">
          <div className="titleResults">
            <p>FILTERS</p>
          </div>
          <FilterCategories
            theme={theme}
            category={category}
            subcategory={subcategory}
            categories={categories}
            history={history}
            dispatch={dispatch}
            setStoreFilters={setStoreFilters}
          />
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Author</p>
            </b>
            <div style={{ textTransform: "capitalize" }}>
              {booksFilter?.map((el) =>
                el.author.length > 1 ? (
                  <React.Fragment>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleClick(e, "author", el.author[0])}
                    >
                      {el.author[0]}
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleClick(e, "author", el.author[1])}
                    >
                      {el.author[1]}
                    </p>
                  </React.Fragment>
                ) : (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleClick(e, "author", el.author[0])}
                  >
                    {el.author[0]}
                  </p>
                )
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="divFilters">
            <b>
              <p className="titlesFilters">Editorial</p>
            </b>
            {booksFilter?.map((b) => (
              <p
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, "editorial", b.editorial)}
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
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, "language", b.language)}
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
          {booksFilter.length > 0 ? (
            booksFilter.map((b) => {
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
            })
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
