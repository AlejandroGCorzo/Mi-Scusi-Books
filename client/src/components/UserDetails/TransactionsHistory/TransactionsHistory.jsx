import React from "react";

function TransactionCard({ id }) {
  return (
    <div>
      <span>Purchase id: {id}</span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default function TransactionHistory({ bills }) {
  return (
    <>{bills.length && bills.map((el) => <TransactionCard id={el._id} />)}</>
  );
}
