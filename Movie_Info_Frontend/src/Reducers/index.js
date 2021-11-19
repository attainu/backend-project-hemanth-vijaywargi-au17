import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import sectionReducer from "./sectionReducer";
import actorReducer from "./actorReducer";
import userReducer from "./userReducer";


const initialState = {
  user : userReducer,
  movies : movieReducer,
  actors : actorReducer,
  sections : sectionReducer
}
const rootReducer = combineReducers(initialState);

export default rootReducer;
