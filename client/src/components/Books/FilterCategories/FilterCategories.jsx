import React, { useState } from "react";

export default function FilterCategories({
  theme,
  category,
  subcategory,
  categories,
  history,
}) {
  // const [sum, setSum] = useState(
  //   theme ? Object.values(categories[theme]).reduce((ac, el) => ac + el, 0) : 0
  // );

  return (
    <React.Fragment>
      <div className="divFilters">
        {theme ? (
          category ? (
            subcategory ? null : (
              <b>
                <p className="titlesFilters">Subcategories</p>
              </b>
            )
          ) : (
            <b>
              <p className="titlesFilters">Categories</p>
            </b>
          )
        ) : (
          <b>
            <p className="titlesFilters">Themes</p>
          </b>
        )}

        {JSON.stringify(categories) !== "{}"
          ? theme
            ? category
              ? subcategory
                ? null
                : Object.keys(categories[theme][category]).length
                ? Object.keys(categories[theme][category])
                    ?.sort()
                    .map((el) => (
                      <label key={el}>
                        <input
                          type="checkbox"
                          value={el}
                          onChange={(e) => {
                            e.preventDefault();
                            history.push(
                              `/books/${theme.replace(
                                /\s/g,
                                "_"
                              )}/${category.replace(/\s/g, "_")}/${el.replace(
                                /\s/g,
                                "_"
                              )}`
                            );
                          }}
                        />
                        {`${el}()`}
                      </label>
                    ))
                : null
              : Object.keys(categories[theme]).length
              ? Object.keys(categories[theme])
                  ?.sort()
                  .map((el) => (
                    <label key={el}>
                      <input
                        type="checkbox"
                        value={el}
                        onChange={(e) => {
                          e.preventDefault();
                          history.push(
                            `/books/${theme.replace(/\s/g, "_")}/${el.replace(
                              /\s/g,
                              "_"
                            )}`
                          );
                        }}
                      />
                      {`${el}()`}
                    </label>
                  ))
              : null
            : Object.keys(categories).length
            ? Object.keys(categories)
                ?.sort()
                .map((el) => (
                  <label key={el}>
                    <input
                      type="checkbox"
                      value={el}
                      onChange={(e) => {
                        e.preventDefault();
                        history.push(`/books/${el.replace(/\s/g, "_")}`);
                      }}
                    />
                    {`${el}()`}
                  </label>
                ))
            : null
          : null}
      </div>
    </React.Fragment>
  );
}
