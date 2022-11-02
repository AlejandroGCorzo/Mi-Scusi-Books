import React from "react";

export default function FilterAuthor({
  booksFilter,
  handleClick,
  storeFilters,
  handleDel,
}) {
  const authors = booksFilter
    .map((el) => el.author)
    .flat(Infinity)
    .filter((el, index, arr) => index === arr.indexOf(el));
  function Authors() {
    return storeFilters.author &&
      JSON.stringify(storeFilters.author) !== "[]" ? (
      <>
        <p>{storeFilters.author[0]}</p>
        <button onClick={(e) => handleDel(e, "author")}>x</button>
      </>
    ) : (
      authors.map((el) => (
        <>
          <p
            style={{ cursor: "pointer" }}
            onClick={(e) => handleClick(e, "author", el)}
          >
            {el}
          </p>
        </>
      ))
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
