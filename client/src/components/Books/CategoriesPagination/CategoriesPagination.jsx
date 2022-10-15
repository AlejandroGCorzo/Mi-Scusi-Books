import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesPagination({ theme, category, subcategory }) {
  return (
    <div style={{ display: 'flex' }}>
      <Link to={'/books'} style={{ textDecoration: 'none' }}>
        Books
      </Link>
      {theme ? (
        category ? (
          subcategory ? (
            <React.Fragment>
              {' --> '}
              <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
                {theme}
              </Link>
              {' --> '}
              <Link
                to={`/books/${theme}/${category}`}
                style={{ textDecoration: 'none' }}
              >
                {category}
              </Link>
              {` --> ${subcategory}`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {' --> '}
              <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
                {theme}
              </Link>
              {' --> '}
              <Link
                to={`/books/${theme}/${category}`}
                style={{ textDecoration: 'none' }}
              >
                {category}
              </Link>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            {' --> '}
            <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
              {theme}
            </Link>
          </React.Fragment>
        )
      ) : null}
    </div>
  );
}
