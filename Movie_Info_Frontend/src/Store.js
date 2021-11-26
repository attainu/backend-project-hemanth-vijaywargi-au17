// Importing Store Creator From Redux Package
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./Reducers";

const isProduction = process.env.NODE_ENV || 'production'
const composedEnhancer = compose(
  applyMiddleware(thunk),
  (isProduction !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
);

// Creating our Global State/Store
const myAppStore = createStore(rootReducer, composedEnhancer);

export default myAppStore;
