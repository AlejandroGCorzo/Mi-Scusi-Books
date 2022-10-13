import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getResults, getCategories } from "../../redux/StoreBooks/booksActions";
import Book from "../Book/Book";
import "./Results.css";

export default function Results() {
  const dispatch = useDispatch();
  const { type, value } = useParams();
  const { results } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.books);
  const currentBooks = results.slice(0, 8);

  useEffect(() => {
    dispatch(getResults(type, value));
    dispatch(getCategories());
  }, [dispatch]);
  console.log(categories);

  return (
    <div className="containerResults">
      <nav className="navResults">
        <p>{`There's ${results.length} results in ${value}`}</p>
      </nav>
      <section className="linkCategories">
        <p>
          <Link to={"/categories"} style={{ textDecoration: "none" }}>
            Categories
          </Link>
          /{value ? value : ""}
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
            <p>Subcategories</p>
            {/* {results?.map((b) => (
              <label>
                <input type="checkbox" id={b._id} value={`${b.author}cb`} />{" "}
                {b.category}
              </label>
            ))} */}
          </div>
          <div className="divAuthorFilter">
            <p>Author</p>
            {results?.map((b) => (
              <label>
                <input type="checkbox" id={b._id} value={`${b.author}cb`}/>
                {b.author}
              </label>
            ))}
          </div>
          <div className="divEditorialFilter">
            <p>Editorial</p>
            {results?.map((b) => (
              <label>
                <input type="checkbox" id={b._id} value={`${b.editorial}cb`}/>
                {b.editorial}
              </label>
            ))}
          </div>
          <div className="divLanguageFilter">
            <p>Language</p>
            {results?.map((b) => (
              <label>
                <input type="checkbox" id={b._id} value={`${b.language}cb`}/>
                {b.language}
              </label>
            ))}
          </div>
          <section className="sectionBooksResults">
            {currentBooks.length > 0 &&
              currentBooks.map((b) => {
                return (
                  <div className="cardBookResults" key={b._id}>
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
