import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, fetchTopTen } from "../../redux/StoreBooks/booksActions.js";
import { getUser } from "../../redux/StoreUsers/usersActions.js";
import { Link } from "react-router-dom";
import shipping from "../../sourceImg/shipping.svg";
import payment from "../../sourceImg/payment.svg";
import protecte from "../../sourceImg/protected.svg";
import stand from "../../sourceImg/stand.png";
import Slider from "./Slider/Slider.jsx";
import HeaderBottom from "../HeaderBottom/HeaderBottom.jsx";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { topTen, books } = useSelector((state) => state.books); //Todos los libros -> faltan libros más vendidos, no se usa por ahora
  const arrivals = books.slice(-10)
  useEffect(() => {
    dispatch(getBooks());
    // dispatch(getUser());
    dispatch(fetchTopTen());
  }, [dispatch]);

  const _ = require("underscore");
  let images = books.map((b) => b.image);
  images = _.shuffle(images);

  return (
    <div className="homePage">
      <div className="promotions">
        <div className="textoPromotions">
          <h3 className="titleShell">Mi Scusi Books</h3>
          <p>
            At Mi Scusi Books we have the best books on the market, check our
            catalog to see the best deals we have for you!
          </p>
          <Link to={"/books"}>
            <button className="buttonView">View!</button>
          </Link>
        </div>

        <div className="stand">
          <div className="imagePromotions">
            <img
              src={images[0]}
              className="promotionImages"
              width="140"
              height="190"
              alt=""
            />
            <img
              src={images[1]}
              className="promotionImages"
              width="140"
              height="190"
              alt=""
            />
            <img
              src={images[2]}
              className="promotionImages"
              width="140"
              height="190"
              alt=""
            />
          </div>
          <div>
            <img src={stand} width="512px" heigth="512px" alt="" />
          </div>
        </div>
      </div>

      <Slider books={arrivals} title={"New Arrivals !"}/>
      <Slider books={topTen} title={"Top 10 Best Selling Books"}/>

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
            Buying more than 5 books at Mi Scusi Books you get one totally free.
          </p>
        </div>

        <div className="imageFail">
          <img src={protecte} alt="" />
          <p>
            At Mi Scusi Books you are always protected with our payment system.
          </p>
        </div>
      </div>
      <HeaderBottom />
    </div>
  );
}
