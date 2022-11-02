import React from "react";

export default function FilterAuthor({
  booksFilter,
  handleClick,
  storeFilters,
  handleDel,
}) {
  function Authors() {
    return storeFilters.author &&
      JSON.stringify(storeFilters.author) !== "[]" ? (
      <>
        <p>{storeFilters.author[0]}</p>
        <button onClick={(e) => handleDel(e, "author")}>x</button>
      </>
    ) : (
      booksFilter?.map((el) =>
        el.author.length > 1 ? (
          <>
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
          </>
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
    );
  }

  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Author</p>
      </b>
      <div className="smallContainer">
        <Authors />
      </div>
    </div>
  );
}
