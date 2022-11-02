import React from "react";

export default function CategoriesSelector(props) {
  function selectorOnChange(e) {
    props.setNewBook({
      ...props.newBook,
      categories: [...props.newBook.categories, e.target.value],
    });
    if (props.newBook.categories.length === 0)
      return props.setCatSel("Select Category");
    if (props.newBook.categories.length === 1)
      return props.setCatSel("Select Subcategory");
    if (props.newBook.categories.length === 2)
      return props.setCatSel("All Options Selected");
  }

  return (
    <div className="divInputForm">
      <span>Categories: </span>
      <select value={props.catSel} onChange={selectorOnChange}>
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] === "number" && (
            <option
              style={{ textTransform: "capitalize" }}
              disabled
              name="Select Subcategory"
            >
              Select Subcategory
            </option>
          )}
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] === "number" && (
            <option
              style={{ textTransform: "capitalize" }}
              disabled
              name="No Subcategory Available"
            >
              No Subcategory Available
            </option>
          )}

        {props.newBook.categories.length === 3 && (
          <option
            style={{ textTransform: "capitalize" }}
            disabled
            name="All Options Selected"
          >
            All Options Selected
          </option>
        )}
        {/*  */}
        {props.newBook.categories.length === 0 && (
          <option
            style={{ textTransform: "capitalize" }}
            disabled
            name="Select Theme"
          >
            Select Theme
          </option>
        )}
        {JSON.stringify(props.categories).length !== "{}" &&
          props.newBook.categories.length === 0 &&
          Object.keys(props.categories)
            .sort()
            .map((el) => (
              <option style={{ textTransform: "capitalize" }} key={el}>
                {el}
              </option>
            ))}
        {/*  */}
        {props.newBook.categories.length === 1 && (
          <option
            style={{ textTransform: "capitalize" }}
            disabled
            name="Select Category"
          >
            Select Category
          </option>
        )}
        {JSON.stringify(props.categories[props.newBook.categories[0]]) !==
          "{}" &&
          props.newBook.categories.length === 1 &&
          Object.keys(props.categories[props.newBook.categories[0]])
            .sort()
            .map((el) => (
              <option style={{ textTransform: "capitalize" }} key={el}>
                {el}
              </option>
            ))}
        {/*  */}
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] !== "number" && (
            <option
              style={{ textTransform: "capitalize" }}
              disabled
              name="Select Subcategory"
            >
              Select Subcategory
            </option>
          )}
        {JSON.stringify(props.categories[props.newBook.categories[0]]) !==
          "{}" &&
          props.newBook.categories.length === 2 &&
          Object.keys(
            props.categories[props.newBook.categories[0]][
              props.newBook.categories[1]
            ]
          )
            .sort()
            .map((el) => (
              <option style={{ textTransform: "capitalize" }} key={el}>
                {el}
              </option>
            ))}
      </select>
    </div>
  );
}
