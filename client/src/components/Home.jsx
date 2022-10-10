import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChars } from '../redux/booksActions.js';

const Home = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div>
      {books?.map((el) => (
        <div key={el.ISBN}>
          <img src={el.image} />
          <span>{el.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Home;
