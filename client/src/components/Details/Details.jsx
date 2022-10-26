import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDetail, getBooks } from "../../redux/StoreBooks/booksActions.js";
import { setEmptyDetail } from "../../redux/StoreBooks/booksSlice.js";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function textRating(value) {
  if (value <= 1) return "Useless";
  if (value > 1 && value <= 2) return "Poor";
  if (value > 2 && value <= 3) return "Ok!";
  if (value > 3 && value <= 4.5) return "Good!";
  if (value > 4.5 && value <= 5) return "Excellent!";
}

const Details = (props) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { shoppingCart } = useSelector((state) => state.users);
  const { favorites } = useSelector((state) => state.users);
  const { loggedUser, login } = useSelector((state) => state.users);
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  /////////////////Simulacion del rating
  var reviewsTest = [];

  reviewsTest.push(
    {
      id: "5",
      coment:
        "Es una joyita. Está recién es mi segunda gpu la anterior era una gtx 750 de 2gb qué para juegos competitivos y no tan exigentes como el fortnite y el valorant andaba bien por encima de los 60 fps mi principal motivo para comprar la gtx 1660 super era jugar otros juegos más exigentes warzone forza horizon 5 battlefield 5 y escape from tarkov antes de comprarla había investigado si los componentes de mi pc acompañarían bien a la tarjeta gráfica i5 8400 16 gb de ram fuente de 550 watts corsair y todo el sistema operativo esta en un ssd. La instalación en el gabinete fue sencilla recomendadísimo para jugar en 1080p con todo en ultra va excelente tal vez los juegos más modernos no en ultra pero si en altos.",
      value: 5,
    },
    { id: "1", coment: "Buenardo", value: 4.5 },
    { id: "2", coment: "Godines", value: 4 },
    { id: "3", coment: "Buen Libro", value: 2.7 },
    { id: "4", coment: "Seeee", value: 5 }
  );

  var totalRating = 0;

  reviewsTest.forEach((e) => {
    totalRating += e.value;
  });

  var value = parseInt((totalRating / reviewsTest.length).toFixed(1));
  ///////////////////////////////////////

  const { detail } = useSelector((state) => state.books);
  const rating =
    detail.rating?.reduce((acc, curr) => acc + curr, 0) / detail.rating?.length;

  useEffect(() => {
    if (accessToken) {
      dispatch(keepLog(accessToken));
      dispatch(fetchFavorites(loggedUser.id));
    }
    dispatch(getBooks());
    dispatch(getDetail(props.match.params.id));
    // dispatch(setEmptyDetail())
    window.scrollTo(0, 0);
    return () => {
      dispatch(setEmptyDetail());
    };
  }, [dispatch, login]);

  function ocultar() {
    var x = document.getElementById("idContentVentana");

    if (x.style.display == "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  function queDibujo(libroID) {
    let asd = favorites.filter((e) => e.id === libroID);

    if (asd.length > 0) {
      return (
        <div onClick={() => deleteFav(detail._id)}>
          <button className="buttonFav" {...label}>
            <Favorite className="favColor" />
          </button>
        </div>
      );
    } else {
      return (
        <div onClick={() => addFavorite(detail._id)}>
          <button className="buttonFav" {...label}>
            <FavoriteBorder className="favColor" />
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
      console.log(cart);
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
      <div
        id="idContentVentana"
        className="contentVentana"
        style={{ display: "none" }}
      >
        <div className="ventana_flotante">
          <div className="contentLike">
            <button className="contentX" onClick={() => ocultar()}>
              X
            </button>
          </div>
          <h3>Product Reviews</h3>
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
                        margin: "25px",
                        color: "#00cc77",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={detail.rating[i + 1]} //Acá hay que pasarle el valor del rating del libro
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />

                      <Box sx={{ ml: 2 }}>{textRating(e.value)}</Box>
                    </Box>
                    <p>{e.user ? e.user : "Algun usuario de google"}</p>
                    <p>{e.text}</p>

                    <div className="contentLike">
                      <Checkbox
                        {...label}
                        icon={<ThumbUpOffAltIcon className="favColor" />}
                        checkedIcon={<ThumbUpAltIcon className="favColor" />}
                      />
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

      <div className="titleFormDetails">
        <p>Book Information</p>
      </div>

      <div className="contentBookDetailDiv">
        <div className="contentFav">{queDibujo(detail._id)}</div>

        <div className="categoryBookDetails">
          <div className="whiteBox">
            <img src={detail.image} className="bookImage" />
          </div>

          <div className="whiteBox">
            <div>
              <span className="bookName">{detail.name}</span>
            </div>
            <div className="detailsContainer">
              <div className="contentRating">
                <Box
                  onClick={() => ocultar()}
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                    color: "#00cc77",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={value} //Acá hay que pasarle el valor del rating del libro
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{textRating(value)}</Box>
                </Box>
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
              <span className="detailsSpan">
                <b>Rating: </b>&nbsp;{detail.rating}.
              </span>
              <span className="detailsSpan">
                <b>Stock:</b>&nbsp;
                {detail.stock === 1
                  ? `${detail.stock} unit`
                  : `${detail.stock} units`}
                .
              </span>
              <span className="price">
                $
                {detail.price && detail.price.toString().length === 2
                  ? detail.price + ".00"
                  : detail.price}
              </span>
              {detail.stock > 0 ? (
                <div className="contLibros">
                  {count === 1 ? (<button disabled>-</button>) 
                  : (<button onClick={() => setCount(count - 1)}>-</button>)}
                  <p>{count}</p>
                  {count === detail.stock ? (<button disabled>+</button>) 
                  : (<button onClick={() => setCount(count + 1)}>+</button>)}
                </div>
              ) : (
                <div className="contLibros">
                <button disabled>-</button>
                <p>0</p>
                <button disabled>+</button>
                </div>
              )}
              <div className="buttonsContainer">
                {/* <button className="buttonBookDetail">
                  <b>Buy</b>
                </button> */}
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
    </div>
  );
};

export default Details;
