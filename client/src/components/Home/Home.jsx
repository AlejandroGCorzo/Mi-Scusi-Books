import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChars } from '../../redux/booksActions.js';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div>
      {books?.map((el) => (
        <div key={el._id}>
          <Link to={`/books/${el._id}`}>
            <img src={el.image} />
            <span>{el.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
