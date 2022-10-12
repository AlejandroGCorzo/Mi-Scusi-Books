import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDetail, getBooks } from "../../redux/StoreBooks/booksActions.js";
import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";
import "./Details.css";

const Details = (props) => {
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(setEmptyDetail());
    };
  }, [dispatch]);

  console.log(detail);

  return (
    <div className="outerDiv">
      <span>{detail.name}</span>
      <img src={detail.image} className="bookImage" />
      {detail.author?.map((el) => (
        <span key={el}>Author: {el}</span>
      ))}
      <span>Editorial: {detail.editorial}</span>
      <span>Price: {detail.price}</span>

      <span>
        Categories:
        {detail.category?.map((el) => (
          <span key={el}>{el}</span>
        ))}
      </span>

      <span>Synopsis: {detail.synopsis}</span>
      <span>Format: {detail.format}</span>
      <span>Edition: {detail.edition}</span>
      <span>Language: {detail.language}</span>
      <span>ISBN: {detail.ISBN}</span>
      <span>Rating: {detail.rating}</span>
      <span>Stock: {detail.stock}</span>

      <span>
        {" "}
        Reviews:
        {detail.reviews?.map((el) => (
          <div key={el.user}>
            <span>{el.user}</span>
            <span>{el.text}</span>
            <span>{el.votes.upvotes}</span>
            <span>{el.votes.downvotes}</span>
          </div>
        ))}
      </span>
    </div>
  );
};

export default Details;
