import React from "react";

export default function FilterCategories({
  theme,
  category,
  subcategory,
  categories,
  history,
  dispatch,
  setStoreFilters,
}) {
  // // // // // // // //
  function sumInObj(object, sum = 0) {
    if (typeof object === "object")
      for (const key in object) {
        if (typeof object[key] !== "number") sum += sumInObj(object[key]);
        else sum += object[key];
      }
    else return object;
    return sum;
  }
  // // // // // // // //

  // // // // // // // //
  return (
    <React.Fragment>
      <div className="divFilters">
        {theme ? (
          category ? (
            subcategory ? (
              <b>
                <p className="titlesFilters">Subcategories</p>
              </b>
            ) : (
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

        {JSON.stringify(categories) !== "{}" ? (
          theme ? (
            category ? (
              subcategory ? (
                <p>No more categories.</p>
              ) : Object.keys(categories[theme][category]).length ? (
                Object.keys(categories[theme][category])
                  ?.sort()
                  .map((el) => (
                    <label key={el} onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        setStoreFilters({
                          category: [theme, category, el],
                        })
                      );
                      history.push(
                        `/books/${theme.replace(
                          /\s/g,
                          "_"
                        )}/${category.replace(/\s/g, "_")}/${el.replace(
                          /\s/g,
                          "_"
                        )}`
                      );
                    }}>
                      
                      {`${el}(${categories[theme][category][el]})`}
                    </label>
                  ))
              ) : (
                <p>No more categories.</p>
              )
            ) : Object.keys(categories[theme]).length ? (
              Object.keys(categories[theme])
                ?.sort()
                .map((el) => (
                  <label key={el} onClick={(e) => {
                    e.preventDefault();
                    dispatch(setStoreFilters({ category: [theme, el] }));
                    history.push(
                      `/books/${theme.replace(/\s/g, "_")}/${el.replace(
                        /\s/g,
                        "_"
                      )}`
                    );
                  }}>

                    {`${el}(${sumInObj(categories[theme][el])})`}
                  </label>
                ))
            ) : null
          ) : Object.keys(categories).length ? (
            Object.keys(categories)
              ?.sort()
              .map((el) => (
                <label key={el} onClick={(e) => {
                  e.preventDefault();
                  dispatch(setStoreFilters({ category: [el] }));
                  history.push(`/books/${el.replace(/\s/g, "_")}`);
                }}>

                  {`${el}(${sumInObj(categories[el])})`}
                </label>
              ))
          ) : null
        ) : null}
      </div>
    </React.Fragment>
  );
}
