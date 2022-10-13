import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Book.css";

export default function Book({ image, name, author, price }) {
  const { id } = useParams();

  return (
    <div className="containerBook" key={id}>
      <div className="contentCard">
        <div className="divImg">
          <img className="imgBook" src={image} alt={`book-${name}`} />
        </div>
        <div className="infoBook">
          <Link to={`/books/${id}`} style={{ textDecoration: "none" }}>
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
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
