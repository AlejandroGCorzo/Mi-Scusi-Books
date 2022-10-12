import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCategories } from '../../redux/StoreBooks/booksActions';
import './createBook.css';

export default function CreateBook() {
  const [newBook, setNewBook] = useState({});
  const [author, setAuthor] = useState('');
  const { categories } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  function onChange(e) {
    if (e.target.name === 'author') {
      setNewBook({
        ...newBook,
        [e.target.name]: Array.isArray(newBook[e.target.name])
          ? [...newBook[e.target.name], author]
          : [author],
      });
      setAuthor('');
      return;
    }
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (!Object.keys(categories).length) dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="bookCreationForm">
      <div className="bookCreationFormInput">
        <div>
          <span>Title:</span>
          <input
            type="text"
            placeholder="Write here"
            name="title"
            onChange={onChange}
          />
        </div>
        <div>
          <span>Author:</span>
          <input
            type="text"
            placeholder="Write here"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <button name="author" disabled={!author.length} onClick={onChange}>
            add
          </button>
        </div>
        <div>
          <span>Editorial:</span>
          <input
            type="text"
            placeholder="Write here"
            name="editorial"
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
              <div>
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
      </div>
    </div>
  );
}
