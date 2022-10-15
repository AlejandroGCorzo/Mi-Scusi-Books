import React from 'react';
// import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function CategoriesPagination({ theme, category, subcategory }) {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
    // <div style={{ display: 'flex' }}>
    //   <Link to={'/books'} style={{ textDecoration: 'none' }}>
    //     Books
    //   </Link>
    //   {theme ? (
    //     category ? (
    //       subcategory ? (
    //         <React.Fragment>
    //           <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
    //             {`/  ${theme}`}
    //           </Link>{' '}
    //           <Link
    //             to={`/books/${theme}/${category}`}
    //             style={{ textDecoration: 'none' }}
    //           >
    //             {`/ ${category}`}
    //           </Link>
    //           {`/ ${subcategory}`}
    //         </React.Fragment>
    //       ) : (
    //         <React.Fragment>
    //           <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
    //             {theme}
    //           </Link>
    //           <Link
    //             to={`/books/${theme}/${category}`}
    //             style={{ textDecoration: 'none' }}
    //           >
    //             {category}
    //           </Link>
    //         </React.Fragment>
    //       )
    //     ) : (
    //       <React.Fragment>
    //         <Link to={`/books/${theme}`} style={{ textDecoration: 'none' }}>
    //           {theme}
    //         </Link>
    //       </React.Fragment>
    //     )
    //   ) : null}
    // </div>
  );
}
