import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, fetchTopTen } from "../../redux/StoreBooks/booksActions.js";
import { getUser } from "../../redux/StoreUsers/usersActions.js";
import { Link } from "react-router-dom";
import book1 from "../../sourceImg/book-4.png";
import book2 from "../../sourceImg/book-5.png";
import book3 from "../../sourceImg/book-6.png";
import shipping from "../../sourceImg/shipping.svg";
import payment from "../../sourceImg/payment.svg";
import protecte from "../../sourceImg/protected.svg";
import stand from "../../sourceImg/stand.png";
import Slider from "./Slider/Slider.jsx";
import HeaderBottom from "../HeaderBottom/HeaderBottom.jsx";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { topTen } = useSelector((state) => state.books); //Todos los libros -> faltan libros más vendidos, no se usa por ahora
 
  useEffect(() => {
    dispatch(getBooks());
    dispatch(getUser());
    dispatch(fetchTopTen())
  }, [dispatch]);
  
  // const images = books.map((b) => b.image);
  // images[Math.floor(Math.random() * images.length)]

  return (
    <div className="homePage">
      <div className="promotions">
        <div className="textoPromotions">
          <h3>Scusi Book's</h3>
          <p>
            At Scusi Book's we have the best books on the market, check our
            catalog to see the best deals we have for you!
          </p>
          <Link to={"/category"}>
            <button className="buttonView">View!</button>
          </Link>
        </div>

        <div className="stand">
          <div className="imagePromotions">
            <img src={book1} width="192px" heigth="192px" alt="" />
            <img src={book2} width="192px" heigth="192px" alt="" />
            <img src={book3} width="192px" heigth="192px" alt="" />
          </div>
          <div>
            <img src={stand} width="512px" heigth="512px" alt="" />
          </div>
        </div>
      </div>

      <Slider books={topTen} />

      <div className="advertisements">
        <div>
          <img src={payment} alt="" />
          <p>
            You can pay with card, debit, cash or up to 12 credit card
            installments.
          </p>
        </div>

        <div>
          <img src={shipping} alt="" />
          <p>
            Buying more than 5 books at Scusi Book's you get one totally free.
          </p>
        </div>

        <div className="imageFail">
          <img src={protecte} alt="" />
          <p>
            At Scusi Book's you are always protected with our payment system.
          </p>
        </div>
      </div>
      <HeaderBottom />
    </div>
  );
}
