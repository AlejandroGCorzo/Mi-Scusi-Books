import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDetail, getBooks } from "../../redux/StoreBooks/booksActions.js";
import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";
import estrellita from "../../sourceImg/estrella.png";
import corazonFav from "../../sourceImg/corazonVacio.png";
import corazonFavActive from "../../sourceImg/corazonLLeno.png";
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

    <div className="contentCategory">

      {/* <div className="reviews">
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
      </div> */}

            <div className="titleFormx">
                <p>Book Information</p>
            </div>

            <div className="contentBookDetailDiv">
                <div className="contentFav">
                  <div>
                    <img src={corazonFav} width="24px" height="24x"/>
                  </div>
                </div>
                <div className="categoryBookDetails">
                
                  <div className="whiteBox">
                    <img src={detail.image} className="bookImage" />
                   
                  </div>
                  
                  <div className="whiteBox">

                    <div><span className="bookName">{detail.name}</span></div>

                    <div className="detailsContainer">
                      <div className="estrellasRating">
                        <img src={estrellita} width="24px" height="24x"/>
                        <img src={estrellita} width="24px" height="24x"/>
                        <img src={estrellita} width="24px" height="24x"/>
                        <img src={estrellita} width="24px" height="24x"/>
                        <img src={estrellita} width="24px" height="24x"/>
                      </div>
                      <span className="detailsSpan">
                      <b>Author: </b>&nbsp;
                        {detail.author?.map((el) => (
                          <span key={el}>{el}.</span>
                        ))}
                      </span>
                      <span className="detailsSpan"><b>Editorial: </b>&nbsp;{detail.editorial}.</span>
                      <span className="detailsSpan">
                        <b>Categories: </b>&nbsp;
                        {detail.category?.map((el) => (
                          <span key={el}>
                            {detail.category.indexOf(el) === detail.category.length - 1
                              ? `${el}.`
                              : `${el} >`}
                          </span>
                        ))}
                      </span>
                      <span className="detailsSpan"><b>Format: </b>&nbsp;{detail.format}.</span>
                      <span className="detailsSpan"><b>Edition: </b>&nbsp;{detail.edition}.</span>
                      <span className="detailsSpan"><b>Language: </b>&nbsp;{detail.language}.</span>
                      <span className="detailsSpan"><b>ISBN: </b>&nbsp;{detail.ISBN}.</span>
                      <span className="detailsSpan"><b>Rating: </b>&nbsp;{detail.rating}.</span>
                      <span className="detailsSpan">
                      <b>Stock:</b>&nbsp;
                        {detail.stock === 1
                          ? `${detail.stock} unit`
                          : `${detail.stock} units`}.
                      </span>
                      <span className="price">${detail.price}</span>
                      <div className="buttonsContainer">
                          <button className="buttonBookDetail"><b>Buy</b></button>
                          <button className="buttonBookDetail"><b>Add to cart</b></button>
                  
                      {/* <button className="buttonBookDetail">Add to Cart</button> */}
                    </div>
                    </div>

                  </div>
                </div>

                <div>
                  <p className="synopsisTitle">Synopsis</p>
                  <span className="synopsisText">{detail.synopsis}</span>
                </div>
                
            </div>

            <div className="formBackx">
            <p>@Mi Scusi Books</p>
            </div>
    </div>
  );
};

export default Details;
