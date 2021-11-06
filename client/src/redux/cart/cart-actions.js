import { CartActionTypes } from "./cart-types";

export const toggleCartMenu = () => ({
  type: CartActionTypes.TOGGLE_CART_MENU,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const clearItem = (id) => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: id,
});

export const increaseItem = (id) => ({
  type: CartActionTypes.INCREASE_ITEM,
  payload: id,
});

export const decreaseItem = (id) => ({
  type: CartActionTypes.DECREASE_ITEM,
  payload: id,
});

export const emptyCart = () => ({
  type: CartActionTypes.EMPTY_CART,
});
