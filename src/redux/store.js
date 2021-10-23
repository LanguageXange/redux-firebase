import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; // middleware for logging errors during development
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
//https://redux.js.org/api/createstore
// reducer, initialstate, enhancer function

const mymiddlewares = [];

if (process.env.NODE_ENV === "development") {
  mymiddlewares.push(logger);
}

export const myStore = createStore(
  rootReducer,
  applyMiddleware(...mymiddlewares)
);
export const persistor = persistStore(myStore);
//console.log(myStore);
