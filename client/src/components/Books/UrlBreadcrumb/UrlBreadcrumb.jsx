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
                onClick={(e) => {
                  dispatch(setStoreFilters({ category: [] }));
                }}
              >
                Books
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}`}
                onClick={(e) => {
                  dispatch(setStoreFilters({ category: [theme] }));
                }}
              >
                {theme}
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}/${category.replace(
                  /\s/g,
                  "_"
                )}`}
                onClick={(e) => {
                  dispatch(setStoreFilters({ category: [theme, category] }));
                }}
              >
                {category}
              </Link>
              <Typography color="text.primary">{subcategory}</Typography>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to="/books"
                onClick={(e) => {
                  dispatch(setStoreFilters({ category: [] }));
                }}
              >
                Books
              </Link>
              <Link
                to={`/books/${theme.replace(/\s/g, "_")}`}
                onClick={(e) => {
                  dispatch(setStoreFilters({ category: [theme] }));
                }}
              >
                {theme}
              </Link>
              <Typography color="text.primary">{category}</Typography>
            </Breadcrumbs>
          )
        ) : (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/books"
              onClick={(e) => {
                dispatch(setStoreFilters({ category: [] }));
              }}
            >
              Books
            </Link>
            <Typography color="text.primary">{theme}</Typography>
          </Breadcrumbs>
        )
      ) : (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Books</Typography>
        </Breadcrumbs>
      )}
    </div>
  );
}
