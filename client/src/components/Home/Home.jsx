import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChars } from '../../redux/booksActions.js';
import { Link } from 'react-router-dom';
import book1 from "../../sourceImg/book-4.png"
import book2 from "../../sourceImg/book-5.png"
import book3 from "../../sourceImg/book-6.png"
import stand from "../../sourceImg/stand.png"
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books); //Libros más vendidos
  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div className='homePage'>

      <div className='promotions'>

        <div className='textoPromotions'>
            <h3>Upto 50% Off</h3>
            <p>At Scusi Book's we have the best books on the market, check our catalog to see the best deals we have for you!</p>
            <Link to={"/category"}>
              <button className='buttonView'>View!</button>
            </Link>
            
        </div>

        <div className='stand'>
          <div className='imagePromotions'>
              <img src={book1} width="192px" heigth="192px" alt=""/>
              <img src={book2} width="192px" heigth="192px" alt=""/>
              <img src={book3} width="192px" heigth="192px" alt=""/>
          </div>
          <div>
            <img src={stand} width="512px" heigth="512px" alt=""/>
          </div>
        </div>

      </div>


      <h3>Top 10 Best Selling Books</h3>
      <div className='detailBook'>

        {books?.map((el) => (
          <Link to={`/books/${el._id}`} key={el._id}>
              <img src={el.image} alt=""/>
              <p>{el.name}</p>
          </Link>
        ))}
      </div>
      
      <Link to="/about">
        <p>About</p>
      </Link>

    </div>
  );
}
