import ShopActionTypes from "./shop-types";

const initial_state = {
  collections: null,
  isFetching: false,
  errorMsg: undefined,
};

const shopReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTION_START:
      return { ...state, isFetching: true };
    case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
      return { ...state, collections: action.payload, isFetching: false };
    case ShopActionTypes.FETCH_COLLECTION_FAIL:
      return { ...state, isFetching: false, errorMsg: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
