// Initial State
const initialState = "white";
  
// Reducer
const colorReducer = (state = initialState, action) => {

    if(action.type==="CHANGE_COLOR"){
        return state + action.payload
    }

    return state
};

export default colorReducer