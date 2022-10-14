import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCategories } from '../../redux/StoreBooks/booksActions';
import CategoriesSelector from './CategoriesSelector/CategoriesSelector.jsx';
import ImgSelector from './ImgSelector/ImgSelector.jsx';
import NewBookPreview from './NewBookPreview/NewBookPreview.jsx';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './CreateBook.css';
import { handleErrors } from './Functions/handleErrors.js';
import { onChange } from './Functions/onChange.js';
import { deleteCategory } from './Functions/deleteCategory.js';

export default function CreateBook() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: [],
    editorial: '',
    edition: 0,
    price: 0,
    categories: [],
    synopsis: '',
    format: '',
    language: '',
    ISBN: 0,
    rating: 0,
    stock: 0,
    reviews: [],
    image: '',
  });
  const [errorHandler, setErrorHandler] = useState({
    edition: '',
    price: '',
    synopsis: '',
    ISBN: '',
    stock: '',
  });
  const [author, setAuthor] = useState('');
  const [catSel, setCatSel] = useState('Select theme');
  const [imgSelected, setImgSelected] = useState({ file: {}, url: '' });
  const [options, setOptions] = useState({
    format: 'Select format',
    language: 'Select language',
  });
  const { categories } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  // // // // // //
  function handleChange(e) {
    onChange(e, newBook, setNewBook, author, setAuthor);
    if (['stock', 'ISBN', 'edition', 'price'].includes(e.target.name))
      handleErrors(e, errorHandler, setErrorHandler);
  }
  // // // // // //
  useEffect(() => {
    if (!Object.keys(categories).length) dispatch(getCategories());
  }, [dispatch]);
  // // // // // //
  return (
    <div className="bookCreationForm">
      <div className="bookCreationFormInput">
        <div>
          <span>Title: </span>
          <input
            type="text"
            placeholder="Write here"
            name="title"
            onChange={handleChange}
          />
        </div>
        <span></span>
        <div>
          <span>Author: </span>
          <input
            type="text"
            placeholder="Write here"
            name="author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && e.target.name === 'author')
                return onChange(e, newBook, setNewBook, author, setAuthor);
            }}
          />
          <button
            name="author"
            disabled={!author.length}
            onClick={handleChange}
          >
            add
          </button>
        </div>
        <span></span>
        <div>
          <span>Editorial: </span>
          <input
            type="text"
            placeholder="Write here"
            name="editorial"
            onChange={handleChange}
          />
        </div>
        <span></span>
        <div>
          <span>Edition: </span>
          <input
            type="text"
            placeholder="Year edition"
            name="edition"
            onChange={handleChange}
          />
        </div>
        <span>{errorHandler.edition}</span>
        <div>
          <span>Price: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="price"
            onChange={handleChange}
          />
        </div>
        <span>{errorHandler.price}</span>
        <CategoriesSelector
          newBook={newBook}
          setNewBook={setNewBook}
          catSel={catSel}
          setCatSel={setCatSel}
          categories={categories}
        />
        <div>
          <span>Synopsis: </span>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Write here"
            style={{ width: 200 }}
            name="synopsis"
            onChange={handleChange}
          />
        </div>
        <span>{errorHandler.synopsis}</span>
        <div>
          <span>Format: </span>
          <select
            value={options.format}
            onChange={(e) => {
              setNewBook({ ...newBook, format: e.target.value });
              setOptions({ ...options, format: e.target.value });
            }}
          >
            <option disabled>Select format</option>
            <option>Digital</option>
            <option>Hardcover</option>
            <option>Paperback</option>
          </select>
        </div>
        <span></span>
        <div>
          <span>Language: </span>
          <select
            value={options.language}
            onChange={(e) => {
              setNewBook({ ...newBook, language: e.target.value });
              setOptions({ ...options, language: e.target.value });
            }}
          >
            <option disabled>Select language</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>
        <span></span>
        <div>
          <span>ISBN: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="ISBN"
            onChange={handleChange}
          />
        </div>
        <span>{errorHandler.ISBN}</span>
        <div>
          <span>Stock: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="stock"
            onChange={handleChange}
          />
        </div>
        <span>{errorHandler.stock}</span>
        <div>
          <ImgSelector
            imgSelected={imgSelected}
            setImgSelected={setImgSelected}
            newBook={newBook}
            setNewBook={setNewBook}
          />
        </div>
        <button type="submit">Create</button>
      </div>
      {/*  */}
      <div>
        <NewBookPreview
          newBook={newBook}
          setNewBook={setNewBook}
          deleteCategory={() => deleteCategory(newBook, setNewBook, setCatSel)}
        />
      </div>
    </div>
  );
}
