import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import App from "./App";
import "./index.css";

import reducers from "./reducers/index.js";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-left" />
  </Provider>,
  document.getElementById("root")
);
