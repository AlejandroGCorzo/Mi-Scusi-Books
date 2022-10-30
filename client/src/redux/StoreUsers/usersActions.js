import axios from "axios";
import {
  getAllUsers,
  getLoggedUserData,
  setUserDetails,
  keepUserLog,
  filterDeleteUser,
  setLogin,
  setChangeRol,
  getFavorites,
  getShoppingCart,
  notLogedCart,
  paymentCompleted,
  allBills,
  forgotPassword,
  changePassword,
  changeBillStatus,
} from "./usersSlice.js";

export const getUser = (token) => {
  return async (dispatch) => {
    let json = await axios.get("/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(getAllUsers(json.data));
  };
};

export const getLoggedUser = (data) => {
  return (dispatch) => {
    return dispatch(getLoggedUserData(data));
  };
};

export const getUserDetails = (id, token) => {
  return async (dispatch) => {
    try {
      const details = await axios.get(`/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setUserDetails(details.data));
    } catch (e) {
      return dispatch(setUserDetails(e.response.data));
    }
  };
};

export const keepLog = (token) => {
  return async (dispatch) => {
    try {
      const user = await axios.get("/user/keepLog", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(keepUserLog(user.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setUserDelete = (id, state, token) => {
  return async (dispatch) => {
    let json = await axios.put(
      `/user/sanction/${id}`,
      { state },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(filterDeleteUser({ id, state }));
  };
};

export const loging = () => (dispatch) => {
  dispatch(setLogin());
};

export const setUserChangeRol = (id, type, token) => {
  return async (dispatch) => {
    let json = await axios.put(
      `/user/type/${id}`,
      { type },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(setChangeRol({ id, type }));
  };
};

/////////////////FAVORITOS Y CARRITO//////////////////////////
export const fetchShoppingCart = (id) => {
  return async function (dispatch) {
    const shoppingCart = await axios.get(`/user/cart/${id}`);
    dispatch(getShoppingCart(shoppingCart.data));
  };
};

export const addCart = (id, idBook, amount, token) => {
  return async (dispatch) => {
    const shoppingCart = await axios.put(
      `/user/cart/${id}`,
      { idBook, amount },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(shoppingCart.data);
    return dispatch(getShoppingCart(shoppingCart.data));
  };
};

export const deleteCart = (id, idBook, token) => {
  return async (dispatch) => {
    const shoppingCart = await axios.put(
      `/user/cart/delete/${id}`,
      { idBook },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(getShoppingCart(shoppingCart.data));
  };
};

export const fetchFavorites = (id) => {
  return async function (dispatch) {
    const favorites = await axios.get(`/user/favorites/${id}`);
    dispatch(getFavorites(favorites.data));
  };
};

export const addFavorites = (id, idBook, token) => {
  return async (dispatch) => {
    const favorites = await axios.put(
      `/user/favorites/${id}`,
      { idBook },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(getFavorites(favorites.data));
  };
};

export const deleteFavorites = (id, idBook, token) => {
  return async (dispatch) => {
    const favorites = await axios.put(
      `/user/favorites/delete/${id}`,
      { idBook },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(getFavorites(favorites.data));
  };
};

export const setNotLogedShoppingCart = (cart) => {
  return (dispatch) => {
    const jsonCart = JSON.parse(cart);
    return dispatch(notLogedCart(jsonCart.books));
  };
};

export const payAccepted = (token) => {
  console.log("entre al action", token);
  return async (dispatch) => {
    console.log("en el dispatch");
    try {
      const pay = await axios.put(
        "/user/pay",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("paydata", pay.data);
      return dispatch(paymentCompleted());
    } catch (e) {
      console.log(e);
    }
  };
};
/////////////////FAVORITOS Y CARRITO//////////////////////////

export const getAllBills = (token) => {
  return async (dispatch) => {
    let json = await axios.get("/bills/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(allBills(json.data));
  };
};

export const putForgotPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      return dispatch(forgotPassword(""));
    }
    const response = await axios.put("/user/forgot_password", { email });
    return dispatch(forgotPassword(response.data));
  };
};

export const putNewPassword = (newPassword, token) => {
  return async (dispatch) => {
    if (newPassword === "") {
      return dispatch(changePassword(""));
    }
    const response = await axios.put(
      "/user/new_password",
      { newPassword },
      {
        headers: {
          reset: token,
        },
      }
    );
    return dispatch(changePassword(response.data));
  };
};

export const activateAccount = (id) => {
  return async () => {
    try {
      const user = await axios.put(`/user/activation-mail/${id}`);
      return user.data;
    } catch (e) {
      return e;
    }
  };
};

export const setBillStatus = (id, status, token) => {
  return async (dispatch) => {
    const json = await axios.put(
      `bills/status/${id}`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(changeBillStatus({ id, status }));
  };
};
