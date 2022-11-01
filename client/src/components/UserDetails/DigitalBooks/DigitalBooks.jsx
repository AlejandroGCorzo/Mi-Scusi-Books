import React from "react";
import { Link } from "react-router-dom";

function EachDigitalBook(props) {
  //   console.log(props);
  return (
    <div className="purchaseIndividualCard">
      <div>
        <span>Items:</span>
        {props.books.map((el) => (
          <div>
            <span>Name: {el.name}</span>
            <span>Book format: {el.format}</span>
            <span>Amount: {el.amount}</span>
            <span>Unit price: {el.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DigitalBooks({ bills }) {
  return (
    <div className="purchaseCards">
      {bills.length &&
        bills
          .filter((elemento) => elemento.books[0].format === "digital")
          .map((el) => (
            <EachDigitalBook
              books={el.books.map((book, index) => {
                return {
                  name: book.name,
                  format: book.format,
                  amount: el.amountBooks[index],
                  price: el.price[index],
                };
              })}
            />
          ))}
    </div>
  );
}
