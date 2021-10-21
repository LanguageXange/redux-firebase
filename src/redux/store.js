import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; // middleware for logging errors during development
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
//https://redux.js.org/api/createstore
// reducer, initialstate, enhancer function

const mymiddlewares = [logger]; // in case we have more and more middlewares

export const myStore = createStore(
  rootReducer,
  applyMiddleware(...mymiddlewares)
);
export const persistor = persistStore(myStore);
//console.log(myStore);
