// Importing Store Creator From Redux Package
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./Reducers";

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Creating our Global State/Store
const myAppStore = createStore(rootReducer, composedEnhancer);

export default myAppStore;
