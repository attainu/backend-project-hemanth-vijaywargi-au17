// Initial State
const initialState = [];
  
// Reducer
const todosReducer = (state = initialState, action) => {

    if(action.type==="GET_TODOS"){
        return [...state,...action.payload]
    }

    return state
};

export default todosReducer