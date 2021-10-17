import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; // middleware for logging errors during development
import { rootReducer } from "./root-reducer";

//https://redux.js.org/api/createstore
// reducer, initialstate, enhancer function

const mymiddlewares = [logger]; // in case we have more and more middlewares

const myStore = createStore(rootReducer, {}, applyMiddleware(...mymiddlewares));

//console.log(myStore);

export default myStore;
