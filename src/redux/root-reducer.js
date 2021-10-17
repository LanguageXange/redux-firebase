import { combineReducers } from "redux";
import cartReducer from "./cart/cart-reducer";
import userReducer from "./user/user-reducer";

const dummyReducer = () => {
  return { dummyName: "dummyyyyy yeah" };
};
export const rootReducer = combineReducers({
  user: userReducer,
  dummy: dummyReducer,
  mycart: cartReducer,
});

//rootReducer // this is a function that invokes every reducer inside the argument
