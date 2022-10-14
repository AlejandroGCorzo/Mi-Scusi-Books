import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import "./Book.css"; 

export default function Book({ _id, image, name, author, price }) {

  return (
    <div className="containerBook" key={_id}>
      <div className="contentCard">
        <div className="divImg">
          <img className="imgBook" src={image} alt={`book-${name}`}/>
        </div>
        <div className="infoBook">
          <Link to={`/book_details/${_id}`} style={{ textDecoration: "none" }}>
            <p className="nameBook"><b>{name}</b></p>
          </Link>
          <p className="authorBook">{author}</p>
        </div>
        <div className="priceBook">
          <Link to={`/shoppingcart`} style={{ textDecoration: "none" }}>
            <span>
              <button className="btnBuy"><b>BUY</b></button>
            </span>
          </Link>
          <b><span className="priceNumber">
            ${price}
          </span></b>
        </div>
      </div>
    </div>
  );
}