import React from 'react';
import noImgAvailable from '../../../sourceImg/no_image_available.png';

export default function NewBookPreview({
  newBook,
  setNewBook,
  deleteCategory,
}) {
  return (
    <div>
      {newBook.image ? (
        <img className="imgPreview" src={newBook.image} />
      ) : (
        <img className="imgPreviewDefault" src={noImgAvailable} />
      )}
      {newBook.title ? <span>Title: {newBook.title}.</span> : null}
      {newBook.author?.length > 0 ? (
        newBook.author.length > 1 ? (
          <div>
            <span>Authors: {newBook.author.join(', ')}.</span>
            <button
              onClick={() => {
                setNewBook({
                  ...newBook,
                  author: newBook.author.slice(0, newBook.author.length - 1),
                });
              }}
            >
              Delete last
            </button>
          </div>
        ) : (
          newBook.author.map((el) => (
            <div key={el}>
              {' '}
              <span key={el}>Author: {el}.</span>
              <button
                onClick={() => {
                  setNewBook({
                    ...newBook,
                    author: newBook.author.slice(0, newBook.author.length - 1),
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))
        )
      ) : null}
      {newBook.editorial ? <span>Editorial: {newBook.editorial}.</span> : null}
      {newBook.edition ? <span>Edition: Year {newBook.edition}.</span> : null}
      {newBook.price ? <span>Price: U$D {newBook.price}.</span> : null}
      {newBook.categories.length > 0 && (
        <span>Theme: {newBook.categories[0]}.</span>
      )}
      {newBook.categories.length > 1 && (
        <span>Categoy: {newBook.categories[1]}.</span>
      )}
      {newBook.categories.length > 2 && (
        <span>SubCategory: {newBook.categories[2]}.</span>
      )}
      {newBook.categories.length > 0 && (
        <button onClick={deleteCategory}>Delete last category</button>
      )}
      {newBook.synopsis ? <span>Synopsis: {newBook.synopsis}.</span> : null}
      {newBook.format ? <span>Format: {newBook.format}.</span> : null}
      {newBook.language ? <span>Language: {newBook.language}.</span> : null}
      {newBook.ISBN ? <span>ISBN: {newBook.ISBN}.</span> : null}
      {newBook.stock > 1 ? (
        <span>Stock: {newBook.stock} units.</span>
      ) : newBook.stock ? (
        <span>Stock: {newBook.stock} unit.</span>
      ) : null}
    </div>
  );
}
