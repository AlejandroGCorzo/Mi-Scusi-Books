import React from "react";

export default function FilterAuthor({
  booksFilter,
  handleClick,
  storeFilters,
  handleDel,
}) {
  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Author</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.author ? (
          <React.Fragment>
            <p>{storeFilters.author[0]}</p>
            <button onClick={(e) => handleDel(e, "author")}>x</button>
          </React.Fragment>
        ) : (
          booksFilter?.map((el) =>
            el.author.length > 1 ? (
              <div key={el.author[0]}>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClick(e, "author", el.author[0])}
                >
                  {el.author[0]}
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClick(e, "author", el.author[1])}
                >
                  {el.author[1]}
                </p>
              </div>
            ) : (
              <p
                key={el.author[0]}
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, "author", el.author[0])}
              >
                {el.author[0]}
              </p>
            )
          )
        )}
      </div>
    </div>
  );
}
