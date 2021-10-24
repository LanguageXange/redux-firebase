import ShopActionTypes from "./shop-types";

const initial_state = { collections: null };

const shopReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTION:
      return { ...state, collections: action.payload };

    default:
      return state;
  }
};

export default shopReducer;
