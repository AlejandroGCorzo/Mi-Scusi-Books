import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoriesSelector(props) {
  function selectorOnChange(e) {
    props.setNewBook({
      ...props.newBook,
      categories: [...props.newBook.categories, e.target.value],
    });
  }
  return (
    <div>
      <span>Categories: </span>
      <select value={props.catSel} onChange={selectorOnChange}>
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
        {}
        {}
        {}
        {}
      </select>
    </div>
  );
}
