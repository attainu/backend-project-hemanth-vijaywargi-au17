import { combineReducers } from "redux";

import colorReducer from "./colorReducer";
import messageReducer from "./messageReducer";
import todosReducer from "./todosReducer";

const rootReducer = combineReducers({
  color: colorReducer,
  message: messageReducer,
  todos: todosReducer,
});

export default rootReducer;
