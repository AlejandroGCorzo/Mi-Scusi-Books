import React from "react";

export default function FilterEditorial({
  booksFilter,
  handleClick,
  storeFilters,
  handleDelEditorial,
}) {
  const allEdit = booksFilter?.map((el) => el.editorial);

  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Editorial</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.editorial ? (
          <React.Fragment>
            <p>{storeFilters.editorial}</p>
            <button onClick={handleDelEditorial}>x</button>
          </React.Fragment>
        ) : (
          allEdit
            ?.filter((item, index) => allEdit.indexOf(item) === index)
            .map((el) => (
              <p
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, "editorial", el)}
              >
                {el}
              </p>
            ))
        )}
      </div>
    </div>
  );
}
