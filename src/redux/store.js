import { applyMiddleware, createStore } from "redux";
//import logger from "redux-logger"; // middleware for logging errors during development
import { rootReducer } from "./root-reducer";

//https://redux.js.org/api/createstore
// reducer, initialstate, enhancer function

//const mymiddlewares = []; // in case we have more and more middlewares
//applyMiddleware(...mymiddlewares)
const myStore = createStore(rootReducer, {});

//console.log(myStore);

export default myStore;
