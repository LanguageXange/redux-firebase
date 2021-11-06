import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { myStore, persistor } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={myStore}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
