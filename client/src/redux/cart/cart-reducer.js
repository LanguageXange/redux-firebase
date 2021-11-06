import { CartActionTypes } from "./cart-types";
import {
  addItemToCart,
  removeItemFromCart,
  increaseItem,
  decreaseItem,
} from "./cart.utils";

const initial_state = {
  hidden: true,
  items: [],
};

const cartReducer = (state = initial_state, action) => {
  switch (action.type) {
    case CartActionTypes.EMPTY_CART:
      return { ...state, items: [] };
    case CartActionTypes.TOGGLE_CART_MENU:
      return { ...state, hidden: !state.hidden };

    case CartActionTypes.ADD_ITEM:
      return { ...state, items: addItemToCart(state.items, action.payload) };
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload),
      };
    case CartActionTypes.INCREASE_ITEM:
      return {
        ...state,
        items: increaseItem(state.items, action.payload),
      };
    case CartActionTypes.DECREASE_ITEM:
      return {
        ...state,
        items: decreaseItem(state.items, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
