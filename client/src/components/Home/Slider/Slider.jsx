import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  addCart,
  setNotLogedShoppingCart,
  deleteFavorites,
  deleteCart,
} from "../../../redux/StoreUsers/usersActions.js";
import "./Slider.scss";

function textRating(value) {
  if (value > 0 && value <= 1) return "Useless";
  if (value > 1 && value <= 2) return "Poor";
  if (value > 2 && value <= 3) return "Ok!";
  if (value > 3 && value <= 4.5) return "Good!";
  if (value > 4.5 && value <= 5) return "Excellent!";
  return "Not Rated!";
}

export default function SliderImg({ books, title }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const { loggedUser, login, favorites, shoppingCart } = useSelector(
    (state) => state.users
  );
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const cartToken = window.sessionStorage.getItem("cart");

  ////////////////////////////SettingSlider//////////////////////////////////////
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    dots: true,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  ////////////////////////////SettingSlider//////////////////////////////////////

  ////////////////////////////FAVORITOS//////////////////////////////////////
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
  function addToCart(libro) {
    if (accessToken) {
      dispatch(addCart(loggedUser.id, libro._id, 1, accessToken));
    } else {
      const localCart = {
        books: [],
      };
      const cart = JSON.parse(window.sessionStorage.getItem("cart"));
      if (cart) {
        localCart.books = [...cart.books];
      }
      const book = {
        id: libro._id,
        name: libro.name,
        price: libro.price,
        image: libro.image,
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
    let tieneFavorito = shoppingCart.filter((e) => e.id === libro._id);
    console.log(shoppingCart);
    if (tieneFavorito.length > 0) {
      return (
        <button className="buttonFav" onClick={() => deleteCar(libro._id)}>
          <TaskAltIcon className="favColor" />
        </button>
      );
    } else {
      return (
        <button className="buttonFav" onClick={() => addToCart(libro)}>
          <AddShoppingCartIcon className="favColor" />
        </button>
      );
    }
  }
  ////////////////////////////CARRITO//////////////////////////////////////

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

  function contRating(rating) {
    let totalRating = 0;
    rating?.map((e) => {
      totalRating += e;
    });
    return totalRating / rating.length;
  }

  return (
    <div className="containerx">
      <div className="containerSlider">
        <div className="titleTop">
          <h3>{title}</h3>
        </div>

        <Slider {...settings}>
          {books.map((el) => (
            <div className="cardNew" key={el._id}>
              <div className="inside">
                <div className="iconSlider">{queDibujo(el._id)}</div>
              </div>

              <div className="card-top">
                <img src={el.image} alt="" />
              </div>

              <div className="contentDetailsSlider">
                <div className="nameAndPrice">
                  <div>
                    <Link
                      to={`/book_details/${el._id}`}
                      style={{ textDecoration: "none", color: "#34495e" }}
                    >
                      {el.name.length > 21 ? (
                        <span
                          title={el.name.toUpperCase()}
                          style={{ cursor: "pointer" }}
                        >
                          {el.name.substr(0, 21)}...
                        </span>
                      ) : (
                        <span
                          title={el.name.toUpperCase()}
                          style={{ cursor: "pointer" }}
                        >
                          {el.name}
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
                      value={contRating(el.rating)}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box sx={{ ml: 1, fontSize: "14px" }}>{textRating(contRating(el.rating))}</Box>
                  </Box>

                  <div className="priceSlider">
                    <p>
                      $
                      {el.price.toString().length === 2
                        ? el.price + ".00"
                        : el.price}
                    </p>
                  </div>
                </div>

                <div className="addToCartSlider">
                  <Link
                    to={`/book_details/${el._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="buttonFav">
                      <VisibilityIcon />
                    </button>
                  </Link>

                  {queDibujoCart(el)}
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
}
