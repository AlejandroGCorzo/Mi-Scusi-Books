import React from "react";

function TransactionCard(props) {
  console.log(props);
  return (
    <div className="purchaseIndividualCard">
      <span>Purchase id: {props.id}.</span>
      <span>Date: {props.date}</span>
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
      <span>Discount: {props.discount}</span>
      <span>total: {props.total}</span>
      <span>Loyalty Points earned: {props.loyaltyPoint}</span>
      <span>Status: {props.status}</span>
    </div>
  );
}

export default function TransactionHistory({ bills }) {
  return (
    <div className="purchaseCards">
      {bills.length &&
        bills.map((el) => (
          <TransactionCard
            id={el._id}
            books={el.books.map((book, index) => {
              return {
                name: book.name,
                format: book.format,
                amount: el.amountBooks[index],
                price: el.price[index],
              };
            })}
            loyaltyPoint={el.loyaltyPoint}
            discount={el.discount}
            total={el.total}
            date={el.date}
            status={el.status}
          />
        ))}
    </div>
  );
}
