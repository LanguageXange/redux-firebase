import { combineReducers } from "redux";
import cartReducer from "./cart/cart-reducer";
import directoryReducer from "./directory/directory-reducer";

import userReducer from "./user/user-reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "./shop/shop-reducer";

const dummyReducer = () => {
  return { dummyName: "dummyyyyy yeah" };
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["mycart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  dummy: dummyReducer,
  mycart: cartReducer,
  mydirectory: directoryReducer,
  myshop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);

//rootReducer // this is a function that invokes every reducer inside the argument
