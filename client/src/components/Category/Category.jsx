import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getCategories,
  getResults,
} from "../../redux/StoreBooks/booksActions.js";
import "./Category.css";

export default function Category() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categories } = useSelector((state) => state.books);

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
    let theme = categories[index];
    let total = 0;
    Object.keys(theme)
      .sort()
      .map((el) => {
        if (typeof theme[el] !== "object" && theme[el] !== 0) {
          total += theme[el];
        } else {
          Object.keys(theme[el])
            .sort()
            .map((elx) => {
              if (typeof theme[el][elx] !== "object" && theme[el][elx] !== 0) {
                total += theme[el][elx];
              }
            });
        }
      });
    return `(${total})`;
  }

  function numTotalCategory(index, ea) {
    let category = categories[index];
    let total = 0;

    if (typeof category[ea] !== "object" && category[ea] !== 0) {
      return `(${category[ea]})`;
    } else {
      Object.keys(category[ea])
        .sort()
        .map((elx) => {
          if (typeof category[ea][elx] !== "object" && category[ea][elx] !== 0) {
            total += category[ea][elx];
          }
        });
    }
    return `(${total})`;
  }

  function numTotalSubCategory(index, ea, e) {
    let subCategory = categories[index];
    if (typeof subCategory[ea][e] !== "object") {
      return `(${subCategory[ea][e]})`;
    }
  }

  function viewCategory(index) {
    return (
      <div>
        {JSON.stringify(categories[index]) !== "{}" &&
          Object.keys(categories[index])
            .sort()
            .map((el) => (
              numTotalCategory(index, el) !== "(0)" ? 

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
                      numTotalSubCategory(index, el, elx) !== "(0)" ?
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
                      : null

                    ))}

                </div>
              : null
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
              numTotalGeneral(el) !== "(0)" ? 
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
                : null
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
