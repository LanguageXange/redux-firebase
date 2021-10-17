import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";

const dummyReducer = (state, action) => {
  return { dummyName: "dummyyyyy yeah" };
};
export const rootReducer = combineReducers({
  user: userReducer,
  dummy: dummyReducer,
});

//rootReducer // this is a function that invokes every reducer inside the argument
