import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  bookFiltered,
  getCategories,
  setStoreFilters,
  orderFilteredBooks,
  setCurrentPage,
} from "../../redux/StoreBooks/booksActions.js";
import Book from "../Book/Book.jsx";
import UrlBreadcrumb from "./UrlBreadcrumb/UrlBreadcrumb.jsx";
import FilterCategories from "./FilterCategories/FilterCategories.jsx";
import FilterAuthor from "./FilterAuthor/FilterAuthor.jsx";
import FilterEditorial from "./FilterEditorial/FilterEditorial.jsx";
import FilterLanguage from "./FilterLanguage/FilterLanguage.jsx";
import FilterFormat from "./FilterFormat/FilterFormat.jsx";
import MenuMobile from "./MenuMobile/MenuMobile.jsx"
import "./Books.css";
import FilterStock from "./FilterStock/FilterStock.jsx";
import Pages from "./Pages/Pages.jsx";

export default function Books() {

  // // // // // //
  const history = useHistory();
  const dispatch = useDispatch();
  // // // // // // STORE
  const { booksFilter, categories, storeFilters, page } = useSelector(
    (state) => state.books
  );
  // console.log(booksToShow);
  // // // // // // STATES CREADOS POR ALE
  const [render, setRender] = useState(false);
  const [selectOrder, setSelectOrder] = useState("Select");
  let { theme, category, subcategory } = useParams();
  theme = theme?.replace(/\_/g, " ");
  category = category?.replace(/\_/g, " ");
  subcategory = subcategory?.replace(/\_/g, " ");

  // // // // // // PAGINATO
  
  // const booksPerPage = 10;   
  const lastIndex = (page.currentPage * page.rows) + page.rows;
  const firstIndex = lastIndex - page.rows;
  // const totalPages = Math.ceil(booksFilter.length / booksPerPage);
  let booksToShow = booksFilter.slice(firstIndex, lastIndex);


  // // // // // // USE EFFECT
  useEffect(() => {
    dispatch(setCurrentPage({currentPage: 0, rows: 25}))
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
    window.scrollTo(0, 0);
    return setSelectOrder("Select");
  }, [dispatch, theme, category, subcategory, render]);
  // // // // // // // FUNCIONES
  function handleClick(e, type, value) {
    e.preventDefault();
    if (type === "author") {
      dispatch(setStoreFilters({ [type]: [value] }));
      setRender(!render);
    } else {
      dispatch(setStoreFilters({ [type]: value }));
      setRender(!render);
    }
  }
  function handleDel(e, type) {
    e.preventDefault();
    dispatch(setStoreFilters({ [type]: false }));
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
        <div className="divPagination">
          <Pages count={booksFilter.length}/>
        </div>
      </div>

      <div className="menuMobile">
        <MenuMobile
            theme={theme}
            category={category}
            subcategory={subcategory}
            categories={categories}
            history={history}
            dispatch={dispatch}
            setStoreFilters={setStoreFilters}
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDel={handleDel}
        />
      </div>

      <div className="resultsMain">
        
        <div className="filtersResults">
          <div className="titleResults">
            <p className="filterMenu">FILTERS</p>
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
            handleDel={handleDel}
          />
          <FilterEditorial
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDel={handleDel}
          />
          <FilterLanguage
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDel={handleDel}
          />
          <FilterFormat
            booksFilter={booksFilter}
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDel={handleDel}
          />
          <FilterStock
            handleClick={handleClick}
            storeFilters={storeFilters}
            handleDel={handleDel}
          />
          {/* NO TOCAR ARRIBA */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* MODIFICADO HASTA ACÁ */}
        </div>

        <div className="sectionBooksResults">

          <div className="orderSelect">
            <p>Order by </p>

            <select
              value={selectOrder}
              className="selectResults"
              onChange={(e) => {
                setSelectOrder(e.target.value);
                dispatch(orderFilteredBooks(e.target.value));
              }}
            >
              <option disabled value="Select">
                Select
              </option>
              <option value="highest">Highest price</option>
              <option value="lowest">Lowest price</option>
              <option value="rating">Best rating</option>
              <option value="A">Title (A-Z)</option>
              <option value="Z">Title (Z-A)</option>
            </select>
          </div>
          <div className="booksContainer">    
          {booksToShow.length > 0 ? (
            booksToShow.map((el) => {
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
      <p></p>
      <div className="divPaginationBottom">
        <Pages count={booksFilter.length}/>
      </div>
      
    </div>
  );
}
