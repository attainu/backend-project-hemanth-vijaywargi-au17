// Importing Store Creator From Redux Package
import { createStore } from "redux";

// Initial State
const initialState = {
  message: "This is the Redux Global State!",
};

// Action Creator
export const changeMessage = (message) => {
    return {
        type : "CHANGE_MESSAGE",
        payload : message
    }
}

// Reducer
const reducer = (state = initialState, action) => {

    if(action.type==="CHANGE_MESSAGE"){
        return {
            ...state,
            message : action.payload
        }
    }

    return state
};

// Creating our Global State/Store
const myAppStore = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default myAppStore;
