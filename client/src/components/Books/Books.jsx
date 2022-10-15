import React, { useEffect, useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  // getResults,
  bookFiltered,
  getCategories,
  setStoreFilters,
} from "../../redux/StoreBooks/booksActions.js";
import Book from "../Book/Book.jsx";
import UrlBreadcrumb from "./UrlBreadcrumb/UrlBreadcrumb.jsx";
import FilterCategories from "./FilterCategories/FilterCategories.jsx";
import FilterAuthor from "./FilterAuthor/FilterAuthor.jsx";
import FilterEditorial from "./FilterEditorial/FilterEditorial.jsx";
import FilterLanguage from "./FilterLanguage/FilterLanguage.jsx";
import "./Books.css";

export default function Books() {
  // // // // // //
  const history = useHistory();
  const dispatch = useDispatch();
  // // // // // // STORE
  const { booksFilter, categories, storeFilters } = useSelector(
    (state) => state.books
  );
  // // // // // // STATES CREADOS POR ALE
  const [render, setRender] = useState(false);
  let { theme, category, subcategory } = useParams();
  theme = theme?.replace(/\_/g, " ");
  category = category?.replace(/\_/g, " ");
  subcategory = subcategory?.replace(/\_/g, " ");
  // // // // // // USE EFFECT
  useEffect(() => {
    if (!theme && !category && !subcategory) {
      dispatch(bookFiltered(storeFilters));
    }
    if (theme && !category && !subcategory) {
      dispatch(setStoreFilters({ category: [theme] }));
      dispatch(bookFiltered({ ...storeFilters, category: [theme] }));
    }
    if (theme && category && !subcategory) {
      dispatch(setStoreFilters({ category: [theme, category] }));
      dispatch(bookFiltered({ ...storeFilters, category: [theme, category] }));
    }
    if (theme && category && subcategory) {
      dispatch(setStoreFilters({ category: [theme, category, subcategory] }));
      dispatch(
        bookFiltered({
          ...storeFilters,
          category: [theme, category, subcategory],
        })
      );
    }
    dispatch(getCategories());
  }, [dispatch, theme, category, subcategory, render]);
  // // // // // // // FUNCIONES
  function handleClick(e, type, value) {
    e.preventDefault();
    if (type === "author") {
      dispatch(setStoreFilters({ [type]: [value] }));
      setRender(!render);
    }
    if (type === "editorial" || type === "language") {
      dispatch(setStoreFilters({ [type]: value }));
      setRender(!render);
    }
  }
  function handleDelAuthor(e) {
    e.preventDefault();
    dispatch(setStoreFilters({ author: false }));
    setRender(!render);
  }
  function handleDelEditorial(e) {
    e.preventDefault();
    dispatch(setStoreFilters({ editorial: false }));
    setRender(!render);
  }
  function handleDelLanguage(e) {
    e.preventDefault();
    dispatch(setStoreFilters({ language: false }));
    setRender(!render);
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
          <FilterAuthor
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDelAuthor={handleDelAuthor}
            render={render}
            setRender={setRender}
          />
          <FilterEditorial
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDelEditorial={handleDelEditorial}
          />
          <FilterLanguage
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDelLanguage={handleDelLanguage}
          />
          {/* NO TOCAR ARRIBA */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* MODIFICADO HASTA ACÁ */}
        </div>
        <div className="sectionBooksResults">
          <div className="titleResults"></div>
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
            booksFilter.map((el) => {
              return (
                <div className="cardBookResults" key={el._id}>
                  <Book
                    image={el.image}
                    name={el.name}
                    editorial={el.editorial}
                    author={el.author}
                    price={el.price}
                    _id={el._id}
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
