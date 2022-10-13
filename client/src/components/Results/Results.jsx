import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getResults } from "../../redux/StoreBooks/booksActions";
import Book from "../Book/Book";
import "./Results.css";

export default function Results() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { results } = useSelector((state) => state.books);
  const currentBooks = results.slice(0, 8);

  useEffect(() => {
    dispatch(getResults(category));
  }, [dispatch]);

  return (
    <div className="containerResults">
      <nav className="navResults">
        <p>{`There's ${results.length} results in ${category}`}</p>
      </nav>
      <section className="linkCategories">
        <p>
          <Link to={"/categories"} style={{ textDecoration: "none" }}>
            Categories
          </Link>{" "}
          / {category ? category : ""}
        </p>
        <p>
          <label>Order by</label>
          <select className="selectResults">
            <option value="select">All</option>
            <option value="lowprice">Low to high price</option>
            <option value="highprice">High to low price</option>
            <option value="news">Newest arrivals</option>
            <option value="rating">Rating</option>
          </select>
        </p>
      </section>
      <div className="resultsMain">
        <article className="filtersResults">
          <div className="divCategoriesFilter">
            <label>Subcategories</label>
            <input type="checkbox" id="cb1" value="checkbox1" />
          </div>
          <div className="divAuthorFilter">
            <label>Author</label>
            <input type="checkbox" id="cb2" value="checkbox2" />
          </div>
          <div className="divEditorialFilter">
            <label>Editorial</label>
            <input type="checkbox" id="cb3" value="checkbox3" />
          </div>
          <div className="divLanguageFilter">
            <label>Language</label>
            <input type="checkbox" id="cb4" value="checkbox4" />
          </div>
          <section className="sectionBooksResults">
            {currentBooks.length > 0 &&
              currentBooks.map((b) => {
                return (
                  <div className="cardBookResults" key={b.id}>
                    <Book
                      image={b.image}
                      name={b.name}
                      author={b.author}
                      price={b.price}
                    />
                  </div>
                );
              })}
          </section>
        </article>
      </div>
    </div>
  );
}
