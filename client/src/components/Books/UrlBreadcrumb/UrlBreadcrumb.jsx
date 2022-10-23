import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";

export default function UrlBreadcrumb({
  theme,
  category,
  subcategory,
  dispatch,
  setStoreFilters,
}) {
  return (
    <div role="presentation">
      {theme ? (
        category ? (
          subcategory ? (
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to="/books"
                onClick={() => {
                  dispatch(setStoreFilters({ category: [] }));
                }}
                style={{textDecoration: 'none'}}
              >
                Books
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}`}
                onClick={() => {
                  dispatch(setStoreFilters({ category: [theme] }));
                }}
                style={{textDecoration: 'none', color: 'black'}}
              >
                {theme}
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}/${category.replace(
                  /\s/g,
                  "_"
                )}`}
                onClick={() => {
                  dispatch(setStoreFilters({ category: [theme, category] }));
                }}
                style={{textDecoration: 'none', color: 'black'}}
              >
                {category}
              </Link>
              <Typography>{subcategory}</Typography>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to="/books"
                onClick={() => {
                  dispatch(setStoreFilters({ category: [] }));
                }}
                style={{textDecoration: 'none', color: 'black'}}
              >
                Books
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}`}
                onClick={() => {
                  dispatch(setStoreFilters({ category: [theme] }));
                }}
                style={{textDecoration: 'none', color: 'black'}}
              >
                {theme}
              </Link>
              <Typography>{category}</Typography>
            </Breadcrumbs>
          )
        ) : (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/books"
              onClick={() => {
                dispatch(setStoreFilters({ category: [] }));
              }}
              style={{textDecoration: 'none', color: 'black'}}
            >
              Books
            </Link>
            <Typography>{theme}</Typography>
          </Breadcrumbs>
        )
      ) : (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>Books</Typography>
        </Breadcrumbs>
      )}
    </div>
  );
}
