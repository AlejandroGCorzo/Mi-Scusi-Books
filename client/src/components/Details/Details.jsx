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
          <span className="bookName">{detail.name}</span>
          <div className="detailsContainer">
            <span className="detailsSpan">
              Author:
              {detail.author?.map((el) => (
                <span key={el}>{el}</span>
              ))}
            </span>
            <span className="detailsSpan">Editorial: {detail.editorial}</span>
            <span className="detailsSpan">
              Categories:
              {detail.category?.map((el) => (
                <span key={el}>{detail.category.indexOf(el) === detail.category.length -1 ? `${el}.` : `${el} >`}</span>
              ))}
            </span>
            <span className="detailsSpan">Format: {detail.format}</span>
            <span className="detailsSpan">Edition: {detail.edition}</span>
            <span className="detailsSpan">Language: {detail.language}</span>
            <span className="detailsSpan">ISBN: {detail.ISBN}</span>
            <span className="detailsSpan">Rating: {detail.rating}</span>
            <span className="detailsSpan">Stock: {detail.stock}</span>
          </div>
          <span className="price">${detail.price}</span>
          <div className="buttonsContainer">
            <button className="buttonBookDetail">Buy</button>
            <button className="buttonBookDetail">Add to Cart</button>
          </div>
        </div>
      </div>
      <span className="reviews">
        {" "}
        Reviews
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
