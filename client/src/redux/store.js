import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; // middleware for logging errors during development

import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import myRootSaga from "./root-saga";
//https://redux.js.org/api/createstore
// reducer, initialstate, enhancer function
const sagaMiddleware = createSagaMiddleware();
const mymiddlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  mymiddlewares.push(logger);
}

export const myStore = createStore(
  rootReducer,
  applyMiddleware(...mymiddlewares)
);
sagaMiddleware.run(myRootSaga);
export const persistor = persistStore(myStore);
//console.log(myStore);
