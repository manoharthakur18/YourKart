import {
  ADD_ADDRESS,
  ADD_ORDER,
  QUANTITY_CHANGE,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DELETE_ADDRESS,
  DELETE_ORDER,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from '../ActionType';

export const addItemToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});
export const quantityChange = data => ({
  type: QUANTITY_CHANGE,
  payload: data,
});
export const removeFromCart = index => ({
  type: REMOVE_FROM_CART,
  payload: index,
});

export const addItemToWishlist = data => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});
export const removeFromWishlist = index => ({
  type: REMOVE_FROM_WISHLIST,
  payload: index,
});
export const addAddress = data => ({
  type: ADD_ADDRESS,
  payload: data,
});
export const deleteAddress = index => ({
  type: DELETE_ADDRESS,
  payload: index,
});
export const addOrder = data => ({
  type: ADD_ORDER,
  payload: data,
});
export const deleteOrder = index => ({
  type: DELETE_ORDER,
  payload: index,
});
