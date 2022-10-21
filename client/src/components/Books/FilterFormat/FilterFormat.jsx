import React from "react";

export default function FilterFormat({
  booksFilter,
  handleClick,
  storeFilters,
  handleDel,
}) {
  // const posibilites = ["hardcover", "paperback"]
  let allFormat = booksFilter?.map((el) => el.format);
  allFormat = allFormat?.filter(
    (item, index) => allFormat.indexOf(item) === index
  );
  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Format</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.format ? (
          <React.Fragment>
            <p>{storeFilters.format}</p>
            <button onClick={(e) => handleDel(e, "format")}>x</button>
          </React.Fragment>
        ) : (
          allFormat?.map((el) => (
            <p
              key={el}
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, "format", el)}
            >
              {el}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
