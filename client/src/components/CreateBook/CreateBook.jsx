import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getDetail, getChars } from '../../redux/booksActions.js';
import './createBook.css';

export default function CreateBook() {
  const [newBook, setNewBook] = useState({});
  const [author, setAuthor] = useState('');
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

  return (
    <div className="bookCreationForm">
      <div className='bookCreationFormInput'>
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
      </div>
      <div className="bookCreationFormPreview">
        {newBook.title ? <div>Title: {newBook.title}.</div> : null}
        {newBook.author?.length > 0 ? (
          newBook.author.length > 1 ? (
            <span>Authors: {newBook.author.join(', ')}.</span>
            
          ) : (
            newBook.author.map((el) => <span key={el}>Author: {el}.</span>)
          )
        ) : null}
      </div>
    </div>
  );
}
