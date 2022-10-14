import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Book.css";

export default function Book({ _id, image, name, author, price }) {
  console.log("id", _id)

  return (
    <div className="containerBook" key={_id}>
      <div className="contentCard">
        <div className="divImg">
          <img className="imgBook" src={image} alt={`book-${name}`} width="130px" />
        </div>
        <div className="infoBook">
          <Link to={`/books/${_id}`} style={{ textDecoration: "none" }}>
            <p className="nameBook">{name}</p>
          </Link>
          <p className="authorBook">{author}</p>
        </div>
        <div className="priceBook">
          <Link to={`/shoppingcart`} style={{ textDecoration: "none" }}>
            <span>
              <button className="buttonBuy">BUY</button>
            </span>
          </Link>
          <span>
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
}