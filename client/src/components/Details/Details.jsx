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
    // dispatch(setEmptyDetail())
    return () => {
      dispatch(setEmptyDetail());
    };
  }, [dispatch]);

  return (
    <div className="outerDiv">
      <div className="whiteBox">
        <div className="rightInnerBox">
          <img src={detail.image} className="bookImage" />
          <span className="synopsisTitle">Synopsis</span>
          <span className="synopsisText">{detail.synopsis}</span>
        </div>
        <div className="leftInnerBox">
          <span>{detail.name}</span>
          {detail.author?.map((el) => (
            <span key={el}>Author: {el}</span>
          ))}
          <span>Editorial: {detail.editorial}</span>

          <span>
            Categories:
            {detail.category?.map((el) => (
              <span key={el}>{el}</span>
            ))}
          </span>

          <span>Format: {detail.format}</span>
          <span>Edition: {detail.edition}</span>
          <span>Language: {detail.language}</span>
          <span>ISBN: {detail.ISBN}</span>
          <span>Rating: {detail.rating}</span>
          <span>Stock: {detail.stock}</span>
          <span>${detail.price}</span>
        </div>
      </div>
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
