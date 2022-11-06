import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getDetail,
  getBooks,
  addReview,
  addVote,
  removeVote,
} from "../../redux/StoreBooks/booksActions.js";
import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import {
  fetchShoppingCart,
  fetchFavorites,
  addFavorites,
  deleteFavorites,
  addCart,
  keepLog,
  setNotLogedShoppingCart,
} from "../../redux/StoreUsers/usersActions.js";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Details.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete.jsx";

const label = {};

function textRating(value) {
  if (value > 0 && value <= 1) return "Useless";
  if (value > 1 && value <= 2) return "Poor";
  if (value > 2 && value <= 3) return "Ok!";
  if (value > 3 && value <= 4.5) return "Good!";
  if (value > 4.5 && value <= 5) return "Excellent!";
  return "Not Rated!";
}

const Details = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [count, setCount] = useState(1);
  const { favorites } = useSelector((state) => state.users);
  const { loggedUser, login, votedReviews, votedBooks } = useSelector(
    (state) => state.users
  );
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [renderDown, setRenderDown] = useState(false);
  const [renderUp, setRenderUp] = useState(false);
  const [msg, setMsg] = useState("");
  const [value, setValue] = useState(0);
  const [valueText, setValueText] = useState("");
  const { detail } = useSelector((state) => state.books);
  const [openConfirm, setOpenConfirm] = useState(false);

  var rating =
    detail.rating?.length > 0
      ? detail.rating?.reduce((acc, curr) => acc + curr, 0) /
        detail.rating?.length
      : 0;
  let yaVotoLibro = votedBooks?.filter((e) => e === detail._id);

  useEffect(() => {
    if (accessToken) {
      dispatch(keepLog(accessToken));
      dispatch(fetchFavorites(accessToken));
    }
    dispatch(getBooks());
    dispatch(getDetail(props.match.params.id));
    // dispatch(setEmptyDetail())
    window.scrollTo(0, 0);
    return () => {
      dispatch(setEmptyDetail());
    };
  }, [dispatch, login]);

  ////////////////////////////////////////////
  var oneStar = 0;
  var twoStar = 0;
  var threStar = 0;
  var forStar = 0;
  var fiveStar = 0;
  var contador = 0;
  var meterCount = [];

  detail.rating?.forEach((e) => {
    if (e === 1) oneStar += 1;
    if (e === 2) twoStar += 1;
    if (e === 3) threStar += 1;
    if (e === 4) forStar += 1;
    if (e === 5) fiveStar += 1;
    contador += 1;
  });

  meterCount.push(
    (oneStar = (oneStar * 100) / contador),
    (twoStar = (twoStar * 100) / contador),
    (threStar = (threStar * 100) / contador),
    (forStar = (forStar * 100) / contador),
    (fiveStar = (fiveStar * 100) / contador)
  );

  ////////////////////////////////////////////

  function ocultar() {
    var idContentVentana = document.getElementById("idContentVentana");

    if (idContentVentana.style.display == "none") {
      idContentVentana.style.display = "flex";
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      idContentVentana.style.display = "none";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }

  function sendReview(libroID) {
    if (accessToken) {
      dispatch(
        addReview(
          document.getElementById("texto").value,
          loggedUser.id,
          libroID,
          value
        )
      );
      var reviewsForm = document.getElementById("reviewsForm");
      reviewsForm.style.display = "none";
    }
  }

  function udapteText() {
    var textoReview = document.getElementById("texto").value;
    console.log(textoReview.length);
    if (textoReview.length > 0) {
      return setValueText(textoReview);
    }

    return setValueText("");
  }

  function sendVote(id, libroID, vote, tipo) {
    let viewReviews = votedReviews?.filter((e) => e.review === id);

    if (viewReviews.length > 0 && tipo !== viewReviews.vote) {
      setMsg("You have already voted!");
      return setOpen(true);
    }

    if (!accessToken) {
      setMsg("Please log in to add vote");
      setOpen(true);
    } else {
      dispatch(addVote(id, libroID, vote, accessToken));
      setRenderUp(true);
    }
  }

  function sendRemoveVote(id, libroID, vote) {
    if (!accessToken) {
      setMsg("Please log in to add vote");
      setOpen(true);
    } else {
      dispatch(removeVote(id, libroID, vote, accessToken));
      setRenderDown(true);
    }
  }

  function queDibujo(libroID) {
    let tieneFavorito = favorites.filter((e) => e.id === libroID);
    if (tieneFavorito.length > 0) {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => deleteFav(detail._id)}
          >
            <Favorite className="favColor" />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => addFavorite(detail._id)}
          >
            <FavoriteBorder className="favColor" />
          </button>
        </div>
      );
    }
  }

  function queLikeDibujo(id, libroID) {
    if (renderUp === true) {
      dispatch(keepLog(accessToken));
      setRenderUp(false);
    }

    let buttonUpvote = votedReviews?.filter(
      (e) => e.review === id && e.vote === "upvote"
    );

    if (buttonUpvote.length > 0) {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => sendRemoveVote(id, libroID, "1", "upvote")}
          >
            <ThumbUpAltIcon className="favColor" />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => sendVote(id, libroID, "1", "upvote")}
          >
            <ThumbUpOffAltIcon className="favColor" />
          </button>
        </div>
      );
    }
  }

  function queLikeDibujoB(id, libroID) {
    if (renderDown === true) {
      dispatch(keepLog(accessToken));
      setRenderDown(false);
    }

    let downButton = votedReviews?.filter(
      (e) => e.review === id && e.vote === "downvote"
    );

    if (downButton.length > 0) {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => sendRemoveVote(id, libroID, "2", "downvote")}
          >
            <ThumbDownAltIcon className="favColor" />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="buttonFav"
            {...label}
            onClick={() => sendVote(id, libroID, "2", "downvote")}
          >
            <ThumbDownOffAltIcon className="favColor" />
          </button>
        </div>
      );
    }
  }

  function addFavorite(libroID) {
    if (!accessToken) {
      setMsg("Please log in to add favorites");
      setOpen(true);
    } else {
      dispatch(addFavorites(loggedUser.id, libroID, accessToken));
    }
  }

  function deleteFav(libroID) {
    dispatch(deleteFavorites(loggedUser.id, libroID, accessToken));
  }

  function addToCart(libroID) {
    if (accessToken) {
      dispatch(addCart(loggedUser.id, libroID, count, accessToken));
      setMsg("Book added to cart!");
      setOpen(true);
    } else {
      const localCart = {
        books: [],
      };
      const cart = JSON.parse(window.sessionStorage.getItem("cart"));
      if (cart) {
        localCart.books = [...cart.books];
      }
      const book = {
        id: detail._id,
        name: detail.name,
        price: detail.price,
        image: detail.image,
        amount: count,
      };
      localCart.books = localCart.books.filter((b) => b.id !== book.id);
      localCart.books.push(book);
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.setItem("cart", JSON.stringify(localCart));
      dispatch(setNotLogedShoppingCart(JSON.stringify(localCart)));
      setMsg("Book added to cart!");
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{ width: "50px" }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function viewRating(value) {
    return (
      <Box
        style={{
          width: 250,
          display: "flex",
          alignItems: "center",
          color: "#287ccb",
          cursor: "pointer",
        }}
      >
        <Rating
          name="text-feedback"
          value={value} //Acá hay que pasarle el valor del rating del libro
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{textRating(value)}</Box>
      </Box>
    );
  }

  const Stats = (valor, i) => {
    return (
      <div className="stats" key={i}>
        <div>
          <meter min="0" max="100" value={valor} />
        </div>

        <div className="detailsMeter">{i + 1}</div>
        <div className="detailsMeter">
          <StarIcon style={{ opacity: 0.25 }} fontSize="inherit" />
        </div>
      </div>
    );
  };
  const [reviewDel, setReviewDel] = useState({});

  function handleDelete() {
    // console.log(reviewDel)
    setOpenConfirm(true);
  }

  function handleEdit() {
    window.sessionStorage.setItem("bookDetail", JSON.stringify(detail));
    history.push(`/book/update/${detail._id}`);
  }

  return (
    <div className="contentCategory">
      <div
        id="idContentVentana"
        className="contentVentana"
        style={{ display: "none" }}
      >
        <div className="ventana_flotante">
          <div className="contentRatingViews">
            <p>Product Reviews</p>
            <button className="contentX" onClick={() => ocultar()}>
              X
            </button>
          </div>

          <div className="newRating">
            <div className="calification">
              <div className="contentCalification">
                <div>
                  <p>{rating.toFixed(1)}</p>
                </div>

                <div className="textCalification">
                  <div>
                    <Rating
                      name="text-feedback"
                      value={rating.toFixed(1)}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <div>
                    <span>{contador} califitacions</span>
                  </div>
                </div>
              </div>

              <div className="contentMeter">
                {meterCount?.map((e, i) => {
                  return Stats(e, i);
                })}
              </div>
            </div>

            <div className="contentReviews">
              {detail.reviews?.length > 0 ? (
                detail.reviews?.map((e, i) => {
                  return (
                    <div className="reviewText" key={e._id}>
                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "95%",
                          margin: "25px",
                          color: "#287ccb",
                        }}
                      >
                        {viewRating(detail.rating[i])}
                        {loggedUser.type === "admin" ||
                        loggedUser.type === "seller" ? (
                          <DeleteIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setReviewDel({
                                reviewId: e._id,
                                user: e.user,
                                rating: e.rating,
                                bookId: e.book,
                                userEmail: e.userEmail,
                              });

                              handleDelete();
                            }}
                          />
                        ) : null}
                      </Box>

                      <p>{e.user ? e.user : "Some google user"}</p>
                      <p>{e.text}</p>

                      <div className="contentLike">
                        {queLikeDibujo(e._id, detail._id)}
                        {e.votes.upvotes}
                        {queLikeDibujoB(e._id, detail._id)}
                        {e.votes.downvotes}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="noReviews">
                  <h3>No reviews available, be the first one!</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="titleFormDetails">
        <p>Book Information </p>
      </div>
      {/* <ConfirmDelete 
        openConfirm={openConfirm} 
        setOpenConfirm={setOpenConfirm}
        bookName={detail.name}
        bookId={detail._id}
        accessToken={accessToken}
        setOpen={setOpen}
        setMsg={setMsg}
      /> */}
      <div className="contentBookDetailDiv">
        <div className="contentFav">
          {loggedUser.type === "admin" ? (
            <button onClick={handleEdit} className="buttonFav">
              <EditIcon className="favColor" />
            </button>
          ) : null}
          {queDibujo(detail._id)}
        </div>

        <div className="categoryBookDetails">
          <div className="whiteBox">
            <div className="bookImage">
              <img src={detail.image} />
            </div>
          </div>

          <div className="whiteBox">
            <div>
              <span className="bookName">{detail.name}</span>
            </div>
            <div className="detailsContainer">
              <div className="contentRating" onClick={() => ocultar()}>
                {viewRating(rating)}
              </div>

              <span className="detailsSpan">
                <b>Author: </b>&nbsp;
                {detail.author?.map((el) => (
                  <span key={el}>{el}.</span>
                ))}
              </span>
              <span className="detailsSpan">
                <b>Editorial: </b>&nbsp;{detail.editorial}.
              </span>
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
              <span className="detailsSpan">
                <b>Format: </b>&nbsp;{detail.format}.
              </span>
              <span className="detailsSpan">
                <b>Edition: </b>&nbsp;{detail.edition}.
              </span>
              <span className="detailsSpan">
                <b>Language: </b>&nbsp;{detail.language}.
              </span>
              <span className="detailsSpan">
                <b>ISBN: </b>&nbsp;{detail.ISBN}.
              </span>
              {/* <span className="detailsSpan">
                <b>Rating: </b>&nbsp;{detail.rating}.
              </span> */}
              <span className="detailsSpan">
                <b>Stock:</b>&nbsp;
                {detail.stock > 0 ? "Available stock!" : "No stock!"}.
              </span>
              <span className="price">
                $
                {detail.price && detail.price.toString().length === 2
                  ? detail.price + ".00"
                  : detail.price}
              </span>
              {detail.stock > 0 ? (
                <div className="contLibros">
                  {count === 1 ? (
                    <button disabled>-</button>
                  ) : (
                    <button onClick={() => setCount(count - 1)}>-</button>
                  )}
                  <p>{count}</p>
                  {count === detail.stock ? (
                    <button disabled>+</button>
                  ) : (
                    <button onClick={() => setCount(count + 1)}>+</button>
                  )}
                </div>
              ) : (
                <div className="contLibros">
                  <button disabled>-</button>
                  <p>0</p>
                  <button disabled>+</button>
                </div>
              )}
              <div className="buttonsContainer">
                {detail.stock > 0 ? (
                  <button
                    className="buttonBookDetail"
                    onClick={() => addToCart(detail._id)}
                  >
                    <b>Add to cart</b>
                  </button>
                ) : (
                  <button className="buttonOutStock" type="button" disabled>
                    <b>Out of stock</b>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* //////////////////////////RATING DETAIL////////////////////////////// */}
        <div className="contentSynopsisAndFormReviews">
          <div className="contentSynopsis">
            <p>Synopsis</p>
            <div className="synopsisText">
              <span>{detail.synopsis}</span>
            </div>
          </div>

          {/* ///////////// */}
          <div className="contentReviewsDetail">
            <div className="contentRatingViewsNew">
              <p>Product Reviews</p>
            </div>

            <div className="newRatingDetail">
              <div className="calificationDetail">
                <div className="contentCalification">
                  <div>
                    <p>{rating.toFixed(1)}</p>
                  </div>

                  <div className="textCalification">
                    <div>
                      <Rating
                        name="text-feedback"
                        value={rating.toFixed(1)}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </div>
                    <div>
                      <span>{contador} rating</span>
                    </div>
                  </div>
                </div>

                <div className="contentMeter">
                  {meterCount?.map((e, i) => {
                    return Stats(e, i);
                  })}
                </div>
              </div>

              <div className="contentReviews">
                {detail.reviews?.length > 0 ? (
                  detail.reviews?.map((e, i) => {
                    if (i < 3) {
                      return (
                        <div className="reviewText" key={e._id}>
                          <Box
                            sx={{
                              width: 200,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              margin: "25px",
                              width: "90%",
                              color: "#287ccb",
                            }}
                          >
                            {viewRating(detail.rating[i])}
                          </Box>
                          <p>{e.user ? e.user : "Some google user"}</p>
                          <p>{e.text}</p>

                          <div className="contentLike">
                            {loggedUser.type === "admin" ||
                            loggedUser.type === "seller" ? (
                              <button
                                className="buttonFav"
                                onClick={() => {
                                  setReviewDel({
                                    reviewId: e._id,
                                    user: e.user,
                                    rating: e.rating,
                                    bookId: e.book,
                                    userEmail: e.userEmail,
                                  });

                                  handleDelete();
                                }}
                              >
                                <DeleteIcon className="favColor" />
                              </button>
                            ) : null}
                            {queLikeDibujo(e._id, detail._id)}
                            {e.votes.upvotes}
                            {queLikeDibujoB(e._id, detail._id)}
                            {e.votes.downvotes}
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="noReviews">
                    <h3>No reviews available, be the first one!</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="viewAllReviews">
              {detail.reviews?.length > 0 ? (
                <p style={{ cursor: "pointer" }} onClick={() => ocultar()}>
                  View all reviews...
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* //////////////////////////////////////////////////////// */}
          {loggedUser.state === "limited" && (
            <span>You cannot place reviews due to your account status.</span>
          )}
          {accessToken &&
          yaVotoLibro.length === 0 &&
          loggedUser.type === "normal" &&
          loggedUser.state !== "limited" ? (
            <div id="reviewsForm" className="revieFromUserContent">
              <span>Review</span>

              <div className="contentTextArea">
                <div className="ratingStarsReviewUser">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>
                <textarea
                  id={"texto"}
                  rows="5"
                  cols="50"
                  placeholder="Review..."
                  name="comentario"
                  onChange={() => udapteText()}
                ></textarea>
              </div>

              <div>
                {value !== 0 && valueText.length > 0 ? (
                  <button
                    className="buttonUdapte"
                    onClick={() => sendReview(detail._id)}
                  >
                    Send!
                  </button>
                ) : (
                  <button className="buttonUdapteDisable" disabled>
                    Send!
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="formBackDetails">
        <p>@Mi Scusi Books</p>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
      <ConfirmDelete
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        user={reviewDel.user}
        reviewId={reviewDel.reviewId}
        bookId={reviewDel.bookId}
        userEmail={reviewDel.userEmail}
        rating={reviewDel.rating}
        accessToken={accessToken}
        setOpen={setOpen}
        setMsg={setMsg}
      />
    </div>
  );
};

export default Details;
