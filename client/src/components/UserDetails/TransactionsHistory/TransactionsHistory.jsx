import React from "react";
import BillsTable from "../../AdminPanel/BillsTable/BillsTable";

function TransactionCard(props) {
  return (
    <div className="purchaseIndividualCard">
      <div>
        <span style={{fontWeight:"600"}}>Purchase id: </span><span>{props.id}</span>
        </div>
      <div>
        <span style={{fontWeight:"600"}}>Date: </span><span>{props.date}</span>
      </div>

      <div>
        {props.books.map((el) => (
          <div className="purchaseCards">
            <div>
              <span style={{fontWeight:"600"}}>Name: </span><span>{el.name}</span>
            </div>
            <div>
              <span style={{fontWeight:"600"}}>Book format: </span><span>{el.format}</span>
            </div>
            <div>
              <span style={{fontWeight:"600"}}>Amount: </span><span>{el.amount}</span>
            </div>
            <div>
              <span style={{fontWeight:"600"}}>Unit price: </span><span>$ {el.price}</span>
            </div>
          </div>
        ))}
      </div>
        <div>
          <span style={{fontWeight:"600"}}>Discount: </span><span>{props.discount} %</span>
        </div>
        <div>
          <span style={{fontWeight:"600"}}>Total: </span><span> ${props.total}</span>
        </div>
        <div>
          <span style={{fontWeight:"600"}}>Loyalty Points earned: </span><span>{props.loyaltyPoint}</span>
        </div>
        <div>
          <span style={{fontWeight:"600"}}>Status: </span><span>{props.status}</span>
        </div>
    </div>
  );
}

export default function TransactionHistory({ bills, userId }) {
  
  console.log('userId', userId);
  return (
    <BillsTable userId={userId} />
    // <div className="purchaseCards">
    //   {bills.length &&
    //     bills.map((el) => (
    //       <TransactionCard
    //         id={el._id}
    //         books={el.books.map((book, index) => {
    //           return {
    //             name: book.name,
    //             format: book.format,
    //             amount: el.amountBooks[index],
    //             price: el.price[index],
    //           };
    //         })}
    //         loyaltyPoint={el.loyaltyPoint}
    //         discount={el.discount}
    //         total={el.total}
    //         date={el.date}
    //         status={el.status}
    //       />
    //     ))}
    // </div>
  );
}
