import { CartActionTypes } from "./cart-types";

export const toggleCartMenu = () => ({
  type: CartActionTypes.TOGGLE_CART_MENU,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
