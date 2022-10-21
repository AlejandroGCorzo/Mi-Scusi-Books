import React from "react";

export default function FilterLanguage({
  booksFilter,
  handleClick,
  storeFilters,
  handleDel,
}) {
  const allLanguage = booksFilter?.map((el) => el.language);

  return (
    <div className="divFilters">
      <b>
        <p className="titlesFilters">Language</p>
      </b>
      <div style={{ textTransform: "capitalize" }}>
        {storeFilters.language ? (
          <React.Fragment>
            <p>{storeFilters.language}</p>
            <button onClick={(e) => handleDel(e, "language")}>x</button>
          </React.Fragment>
        ) : (
          allLanguage
            ?.filter((item, index) => allLanguage.indexOf(item) === index)
            .map((el) => (
              <p
                key={el}
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, "language", el)}
              >
                {el}
              </p>
            ))
        )}
      </div>
    </div>
  );
}
