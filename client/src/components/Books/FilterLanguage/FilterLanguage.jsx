import React from "react";

export default function FilterLanguage({
  booksFilter,
  handleClick,
  storeFilters,
  handleDelLanguage,
}) {
  const allLanguage = booksFilter?.map((el) => el.language);

  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Language</p>
      </b>
      {storeFilters.language ? (
        <React.Fragment>
          <p>{storeFilters.language}</p>
          <button onClick={handleDelLanguage}>x</button>
        </React.Fragment>
      ) : (
        allLanguage
          ?.filter((item, index) => allLanguage.indexOf(item) === index)
          .map((el) => (
            <p
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, "language", el)}
            >
              {el}
            </p>
          ))
      )}
    </div>
  );
}