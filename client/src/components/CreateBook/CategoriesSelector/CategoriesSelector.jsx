import React from 'react';

export default function CategoriesSelector(props) {
  function selectorOnChange(e) {
    props.setNewBook({
      ...props.newBook,
      categories: [...props.newBook.categories, e.target.value],
    });
    if (props.newBook.categories.length === 0)
      return props.setCatSel('Select category');
    if (props.newBook.categories.length === 1)
      return props.setCatSel('Select subcategory');
    if (props.newBook.categories.length === 2)
      return props.setCatSel('All options selected');
  }

  return (
    <div>
      <span>Categories: </span>
      <select value={props.catSel} onChange={selectorOnChange}>
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] === 'number' && (
            <option disabled name="Select subcategory">
              Select subcategory
            </option>
          )}
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] === 'number' && (
            <option disabled name="No subcategory avaible">
              No subcategory avaible
            </option>
          )}

        {props.newBook.categories.length === 3 && (
          <option disabled name="All options selected">
            All options selected
          </option>
        )}
        {/*  */}
        {props.newBook.categories.length === 0 && (
          <option disabled name="Select theme">
            Select theme
          </option>
        )}
        {JSON.stringify(props.categories).length !== '{}' &&
          props.newBook.categories.length === 0 &&
          Object.keys(props.categories)
            .sort()
            .map((el) => <option key={el}>{el}</option>)}
        {/*  */}
        {props.newBook.categories.length === 1 && (
          <option disabled name="Select category">
            Select category
          </option>
        )}
        {JSON.stringify(props.categories[props.newBook.categories[0]]) !==
          '{}' &&
          props.newBook.categories.length === 1 &&
          Object.keys(props.categories[props.newBook.categories[0]])
            .sort()
            .map((el) => <option key={el}>{el}</option>)}
        {/*  */}
        {props.newBook.categories.length === 2 &&
          typeof props.categories[props.newBook.categories[0]][
            props.newBook.categories[1]
          ] !== 'number' && (
            <option disabled name="Select category">
              Select subcategory
            </option>
          )}
        {JSON.stringify(props.categories[props.newBook.categories[0]]) !==
          '{}' &&
          props.newBook.categories.length === 2 &&
          Object.keys(
            props.categories[props.newBook.categories[0]][
              props.newBook.categories[1]
            ]
          )
            .sort()
            .map((el) => <option key={el}>{el}</option>)}
      </select>
    </div>
  );
}
