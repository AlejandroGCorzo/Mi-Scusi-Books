import React from "react";

export default function FilterAuthor({ booksFilter, handleClick }) {
  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Author</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {booksFilter?.map((el) =>
          el.author.length > 1 ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <p
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, "author", el.author[0])}
            >
              {el.author[0]}
            </p>
          )
        )}
      </div>
    </div>
  );
}
