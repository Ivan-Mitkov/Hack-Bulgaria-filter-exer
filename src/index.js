import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import filterReducer from "./store/reducers/reducer_filter";
import fetchReducer from './store/reducers/reducer_fetch';
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  filter: filterReducer,
  fetch:fetchReducer
});
//create simple middleware for logging
const logger = store => {
    return next => {
      return action => {
        console.log("Middleware Dispaching: ", action);
        const result = next(action);
        console.log("Middleware next: ", store.getState());
        return result;
      };
    };
  };
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger,thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
