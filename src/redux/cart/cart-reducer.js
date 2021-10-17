import { CartActionTypes } from "./cart-types";
import { addItemToCart } from "./cart.utils";

const initial_state = {
  hidden: true,
  items: [],
};

const cartReducer = (state = initial_state, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_MENU:
      return { ...state, hidden: !state.hidden };
    case CartActionTypes.ADD_ITEM:
      return { ...state, items: addItemToCart(state.items, action.payload) };
    default:
      return state;
  }
};

export default cartReducer;
