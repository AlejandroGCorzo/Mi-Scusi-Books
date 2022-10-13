import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCategories } from '../../redux/StoreBooks/booksActions';
import CategoriesSelector from './CategoriesSelector/CategoriesSelector.jsx';
import ImgSelector from './ImgSelector/ImgSelector.jsx';
import './CreateBook.css';

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
  function onChange(e) {
    console.log(JSON.stringify(categories));
    if (e.target.name === 'author') {
      setNewBook({
        ...newBook,
        [e.target.name]: [...newBook[e.target.name], author],
      });
      setAuthor('');
      return;
    }
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  }
  function handleKeyDown(e) {
    if (e.keyCode === 13 && e.target.name === 'author') return onChange(e);
  }
  // // // // // //
  function deleteCategory() {
    setNewBook({
      ...newBook,
      categories: newBook.categories.slice(0, newBook.categories.length - 1),
    });
    if (newBook.categories.length === 1) setCatSel('Select theme');
    if (newBook.categories.length === 2) setCatSel('Select category');
    if (newBook.categories.length === 3) setCatSel('Select subcategory');
  }
  // // // // // //
  useEffect(() => {
    if (!Object.keys(categories).length) dispatch(getCategories());
  }, [dispatch]);
  // // // // // //
  return (
    <div className="bookCreationForm">
      <div className="bookCreationFormInput">
        <ImgSelector
          imgSelected={imgSelected}
          setImgSelected={setImgSelected}
        />
        <div>
          <span>Title: </span>
          <input
            type="text"
            placeholder="Write here"
            name="title"
            onChange={onChange}
          />
        </div>
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
            onKeyDown={handleKeyDown}
          />
          <button name="author" disabled={!author.length} onClick={onChange}>
            add
          </button>
        </div>
        <div>
          <span>Editorial: </span>
          <input
            type="text"
            placeholder="Write here"
            name="editorial"
            onChange={onChange}
          />
        </div>
        <div>
          <span>Edition: </span>
          <input
            type="text"
            placeholder="Year edition"
            name="edition"
            onChange={onChange}
          />
        </div>
        <div>
          <span>Price: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="price"
            onChange={onChange}
          />
        </div>
        <CategoriesSelector
          newBook={newBook}
          setNewBook={setNewBook}
          catSel={catSel}
          setCatSel={setCatSel}
          categories={categories}
        />
        <div>
          <span>Synopsis: </span>
          <textarea name="synopsis" onChange={onChange} />
        </div>
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
        <div>
          <span>ISBN: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="ISBN"
            onChange={onChange}
          />
        </div>
        <div>
          <span>Stock: </span>
          <input
            type="text"
            placeholder="Numbers only"
            name="stock"
            onChange={onChange}
          />
        </div>
      </div>

      {/*  */}
      <div className="bookCreationFormPreview">
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
                      author: newBook.author.slice(
                        0,
                        newBook.author.length - 1
                      ),
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )
        ) : null}
        {newBook.editorial ? (
          <span>Editorial: {newBook.editorial}.</span>
        ) : null}
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
        {newBook.format ? <span>Format: {newBook.format}.</span> : null}
        {newBook.language ? <span>Language: {newBook.language}.</span> : null}
        {newBook.ISBN ? <span>ISBN: {newBook.ISBN}.</span> : null}
        {newBook.stock > 1 ? (
          <span>Stock: {newBook.stock} units.</span>
        ) : newBook.stock ? (
          <span>Stock: {newBook.stock} unit.</span>
        ) : null}
      </div>
    </div>
  );
}
