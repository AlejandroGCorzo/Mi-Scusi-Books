import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import "./Book.scss";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  addFavorites,
  addCart,
  setNotLogedShoppingCart,
  deleteFavorites,
  deleteCart,
} from "../../redux/StoreUsers/usersActions.js";

function textRating(value) {
  if (value > 0 && value <= 1) return "Useless";
  if (value > 1 && value <= 2) return "Poor";
  if (value > 2 && value <= 3) return "Ok!";
  if (value > 3 && value <= 4.5) return "Good!";
  if (value > 4.5 && value <= 5) return "Excellent!";
  return "Not Rated!";
}

export default function Book({
  _id,
  image,
  name,
  price,
  rating,
  setOpen,
  setMsg,
}) {
  const dispatch = useDispatch();
  const { loggedUser, login, favorites, shoppingCart } = useSelector(
    (state) => state.users
  );
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const cartToken = window.sessionStorage.getItem("cart");

  ////////////////////////////FAVORITOS//////////////////////////////////////
  function addFavorite(libroID) {
    if (!accessToken) {
      setMsg("Please log in to add favorites");
      setOpen(true);
    } else {
      dispatch(addFavorites(loggedUser.id, libroID, accessToken));
      setMsg("Book added to favorites!");
      setOpen(true);
    }
  }

  function deleteFav(libroID) {
    dispatch(deleteFavorites(loggedUser.id, libroID, accessToken));
    setMsg("Book remove to favorites!");
    setOpen(true);
  }

  function queDibujo(libroID) {
    let tieneFavorito = favorites.filter((e) => e.id === libroID);
    if (tieneFavorito.length > 0) {
      return (
        <div>
          <Favorite
            style={{ cursor: "pointer" }}
            onClick={() => deleteFav(libroID)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <FavoriteBorder
            style={{ cursor: "pointer" }}
            onClick={() => addFavorite(libroID)}
          />
        </div>
      );
    }
  }
  ////////////////////////////FAVORITOS//////////////////////////////////////

  ////////////////////////////CARRITO//////////////////////////////////////
  function addToCart() {
    if (accessToken) {
      dispatch(addCart(loggedUser.id, _id, 1, accessToken));
    } else {
      const localCart = {
        books: [],
      };
      const cart = JSON.parse(window.sessionStorage.getItem("cart"));
      if (cart) {
        localCart.books = [...cart.books];
      }
      const book = {
        id: _id,
        name: name,
        price: price,
        image: image,
        amount: 1,
      };
      localCart.books = localCart.books.filter((b) => b.id !== book.id);
      localCart.books.push(book);
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.setItem("cart", JSON.stringify(localCart));
      dispatch(setNotLogedShoppingCart(JSON.stringify(localCart)));
    }
    setMsg("Book added to cart!");
    setOpen(true);
  }

  function deleteCar(libroID) {
    if (accessToken) {
      dispatch(deleteCart(loggedUser.id, libroID, accessToken));
    } else if (cartToken) {
      const cart = JSON.parse(window.sessionStorage.getItem("cart"));
      cart.books = cart.books.filter((el) => el.id !== libroID);
      window.sessionStorage.removeItem("cart");
      if (cart.books.length > 0) {
        window.sessionStorage.setItem("cart", JSON.stringify(cart));
      }
      dispatch(setNotLogedShoppingCart(JSON.stringify(cart)));
    }
    setMsg("Book remove to cart!");
    setOpen(true);
  }

  function queDibujoCart(libro) {
    let tieneFavorito = shoppingCart.filter((e) => e.id === libro);
    if (tieneFavorito.length > 0) {
      return (
        <button className="buttonFav" onClick={() => deleteCar(libro)}>
          <TaskAltIcon className="favColor" />
        </button>
      );
    } else {
      return (
        <button className="buttonFav" onClick={() => addToCart()}>
          <AddShoppingCartIcon className="favColor" />
        </button>
      );
    }
  }
  ////////////////////////////CARRITO//////////////////////////////////////
  function contRating(rating) {
    let totalRating = 0;
    rating?.map((e) => {
      totalRating += e;
    });
    return totalRating / rating.length;
  }

  return (
    // <div className="containerBook" key={_id}>
    <div className="contentCard">
      <div className="contentCardinside">
        <div className="iconSlider">{queDibujo(_id)}</div>
      </div>

      <div className="card-topBook">
        <img src={image} alt={`book-${name}`} />
      </div>

      <div className="contentDetailsSlider">
        <div className="nameAndPrice">
          <div>
            <Link
              to={`/book_details/${_id}`}
              style={{
                textDecoration: "none",
                color: "#34495e",
                fontSize: "12px",
                textTransform: "uppercase",
              }}
            >
              {name.length > 21 ? (
                <span title={name.toUpperCase()} style={{ cursor: "pointer" }}>
                  {name.substr(0, 21)}...
                </span>
              ) : (
                <span title={name.toUpperCase()} style={{ cursor: "pointer" }}>
                  {name}
                </span>
              )}
            </Link>
          </div>

          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
              color: "#287ccb",
            }}
          >
            <Rating
              name="text-feedback"
              value={contRating(rating)}
              readOnly
              precision={0.5}
              sx={{
                fontSize: "14px",
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="12px" />}
            />
            <Box sx={{ ml: 1, fontSize: "14px" }}>
              {textRating(contRating(rating))}
            </Box>
          </Box>

          <div className="priceSlider">
            <p>${price.toString().length === 2 ? price + ".00" : price}</p>
          </div>
        </div>

        <div className="addToCartSlider">
          <Link to={`/book_details/${_id}`} style={{ textDecoration: "none" }}>
            <button className="buttonFavBook">
              <VisibilityIcon />
            </button>
          </Link>

          {queDibujoCart(_id)}
        </div>
      </div>
    </div>
    // </div>
  );
}
