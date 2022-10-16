import React from "react";

export default function FilterStock({
  handleClick,
  storeFilters,
  handleDelStock,
}) {
  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Format</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.stock ? (
          <React.Fragment>
            <p>{`Stock available`}</p>
            <button onClick={handleDelStock}>x</button>
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
