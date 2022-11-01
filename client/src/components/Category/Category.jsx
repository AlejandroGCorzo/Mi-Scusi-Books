import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getCategories,
  getResults,
} from "../../redux/StoreBooks/booksActions.js";
import ChatBot from "../ChatBot/ChatBot";
import "./Category.css";

export default function Category() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categories } = useSelector((state) => state.books);
  const { loggedUser } = useSelector((state) => state.users)
  const accessToken =
  window.localStorage.getItem("token") ||
  window.sessionStorage.getItem("token");

  function onClickCategoryGeneral(e, theme) {
    e.preventDefault();
    // history.push(`/books/category/${type}`);
    history.push(`/books/${theme}`);
  }

  function onClickCategory(e, theme, category) {
    e.preventDefault();
    // history.push(`/books/category/${type}/${value}`);
    history.push(`/books/${theme}/${category}`);
  }

  function onClickSubCategory(e, theme, category, subCategory) {
    e.preventDefault();
    // history.push(`/books/category/${theme}/${type}/${value}`);
    history.push(`/books/${theme}/${category}/${subCategory}`);
  }

  function numTotalGeneral(index) {
    let asd = categories[index];
    let total = 0;
    Object.keys(asd)
      .sort()
      .map((el) => {
        if (typeof asd[el] !== "object" && asd[el] !== 0) {
          total += asd[el];
        } else {
          Object.keys(asd[el])
            .sort()
            .map((elx) => {
              if (typeof asd[el][elx] !== "object" && asd[el][elx] !== 0) {
                total += asd[el][elx];
              }
            });
        }
      });
    if (total !== 0) return `(${total})`;
  }

  function numTotalCategory(index, ea) {
    let asd = categories[index];
    let total = 0;

    if (typeof asd[ea] !== "object" && asd[ea] !== 0) {
      return `(${asd[ea]})`;
    } else {
      Object.keys(asd[ea])
        .sort()
        .map((elx) => {
          if (typeof asd[ea][elx] !== "object" && asd[ea][elx] !== 0) {
            total += asd[ea][elx];
          }
        });
    }
    if (total !== 0) return `(${total})`;
  }

  function numTotalSubCategory(index, ea, e) {
    let asd = categories[index];
    if (typeof asd[ea][e] !== "object" && asd[ea][e] !== 0) {
      return `(${asd[ea][e]})`;
    }
  }

  function viewCategory(index) {
    return (
      <div>
        {(!accessToken || loggedUser?.type === "normal") && <ChatBot />}
        {JSON.stringify(categories[index]) !== "{}" &&
          Object.keys(categories[index])
            .sort()
            .map((el) => (
              <div className="subCategoryDiv" key={el}>
                <button
                  className="buttonCategory"
                  onClick={(e) =>
                    onClickCategory(
                      e,
                      index.split(" ").join("_"),
                      el.split(" ").join("_")
                    )
                  }
                >
                  <li>
                    {el[0].toLocaleUpperCase() + el.slice(1)} {[index].el}
                    {numTotalCategory(index, el)}
                  </li>
                </button>

                {JSON.stringify(categories[index][el]) !== "{}" &&
                  Object.keys(categories[index][el])
                    .sort()
                    .map((elx) => (
                      <div className="subToCategoryDiv" key={elx}>
                        <button
                          className="buttonCategory"
                          onClick={(e) =>
                            onClickSubCategory(
                              e,
                              index.split(" ").join("_"),
                              el.split(" ").join("_"),
                              elx.split(" ").join("_")
                            )
                          }
                        >
                          <span>
                            {elx[0].toLocaleUpperCase() + elx.slice(1)}
                            {numTotalSubCategory(index, el, elx)}
                          </span>
                        </button>
                      </div>
                    ))}
              </div>
            ))}
      </div>
    );
  }

  useEffect(() => {
    if (!Object.keys(categories).length) dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="contentCategory">
      <div className="titleForm">
        <p className="titleFormText">Categories</p>
      </div>

      <div className="contentCategoryDiv">
        {JSON.stringify(categories).length !== "{}" &&
          Object.keys(categories)
            .sort()
            .map((el) => (
              <div className="categoryDiv" key={el}>
                <button
                  className="buttonCategory"
                  onClick={(e) =>
                    onClickCategoryGeneral(e, el.split(" ").join("_"))
                  }
                >
                  <p className="categoryText">
                    {el[0].toLocaleUpperCase() + el.slice(1)}
                    {numTotalGeneral(el)}
                  </p>
                </button>
                {viewCategory(el)}
              </div>
            ))}
      </div>

      <div className="formBack">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="buttonBack">Back</button>
        </Link>
      </div>
    </div>
  );
}
