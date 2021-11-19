// Initial State
const initialState = "This is the Redux Global State!";
  
// Reducer
const messageReducer = (state = initialState, action) => {

    if(action.type==="CHANGE_MESSAGE"){
        return state + action.payload
    }

    return state
};

export default messageReducer