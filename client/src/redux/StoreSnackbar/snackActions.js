import {
  snackbarBoolean,
  snackBlock,
  snackDeleteUser,
  snackDeleteBook,
  snackStockBook,
} from "./snackSlice.js";

export const snackbarChange = (boolean) => {
  return (dispatch) => {
    return dispatch(snackbarBoolean(boolean));
  };
};
export const snackUserBlock = (boolean) => {
  return (dispatch) => {
    return dispatch(snackBlock(boolean));
  };
};
export const snackUserDelete = (boolean) => {
  return (dispatch) => {
    return dispatch(snackDeleteUser(boolean));
  };
};
export const snackBookDelete = (boolean) => {
  return (dispatch) => {
    return dispatch(snackDeleteBook(boolean));
  };
};
export const snackBookStock = (boolean) => {
  return (dispatch) => {
    return dispatch(snackStockBook(boolean));
  };
};
