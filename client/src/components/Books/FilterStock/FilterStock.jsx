import React from "react";

export default function FilterStock({ handleClick, storeFilters, handleDel }) {
  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Stock</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.stock ? (
          <React.Fragment>
            <p>{`Stock available`}</p>
            <button onClick={(e) => handleDel(e, "stock")}>x</button>
          </React.Fragment>
        ) : (
          <p
            style={{ cursor: "pointer" }}
            onClick={(e) => handleClick(e, "stock", true)}
          >
            {`Stock available`}
          </p>
        )}
      </div>
    </div>
  );
}
