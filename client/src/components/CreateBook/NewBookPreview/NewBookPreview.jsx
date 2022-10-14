import React from 'react';
import noImgAvailable from '../../../sourceImg/no_image_available.png';

export default function NewBookPreview({
  newBook,
  setNewBook,
  setUploading,
  deleteCategory,
}) {
  return (
    <div className="bookCreationFormPreview">
      {newBook.image ? (
        <img className="imgPreview" src={newBook.image} />
      ) : (
        <img className="imgPreviewDefault" src={noImgAvailable} />
      )}
      <span>Title: {newBook.title ? `${newBook.title}` : '<empty>'}</span>
      <span>
        Author:{' '}
        {newBook.author.length ? `${newBook.author.join(', ')}` : '<empty>'}
        {newBook.author.length ? (
          <span
            onClick={() => {
              setNewBook({
                ...newBook,
                author: newBook.author.slice(0, newBook.author.length - 1),
              });
            }}
          >
            Delete last.
          </span>
        ) : null}
      </span>
      <span>
        Editorial: {newBook.editorial ? `${newBook.editorial}` : '<empty>'}
      </span>
      <span>Edition: {newBook.edition ? `${newBook.edition}` : '<empty>'}</span>
      <span>Price: {newBook.price ? `U$D ${newBook.price}` : '<empty>'}</span>
      <span>
        Theme: {newBook.categories[0] ? `${newBook.categories[0]}` : '<empty>'}
      </span>
      <span>
        Categoy:{' '}
        {newBook.categories[1] ? `${newBook.categories[1]}` : '<empty>'}
      </span>
      <span>
        Subcategory:{' '}
        {newBook.categories[2] ? `${newBook.categories[2]}` : '<empty>'}
      </span>
      <button
        disabled={newBook.categories.length === 0}
        onClick={deleteCategory}
      >
        Delete last category
      </button>
      <span>
        Synopsis: {newBook.synopsis ? `${newBook.synopsis}` : '<empty>'}
      </span>
      <span>Format: {newBook.format ? `${newBook.format}` : '<empty>'}</span>
      <span>
        Language: {newBook.language ? `${newBook.language}` : '<empty>'}
      </span>
      <span>ISBN: {newBook.ISBN ? `${newBook.ISBN}` : '<empty>'}</span>

      <span>
        Stock:{' '}
        {newBook.stock
          ? `${newBook.stock} ${newBook.stock > 1 ? 'units' : 'unit'}`
          : '<empty>'}
      </span>
    </div>
  );
}
