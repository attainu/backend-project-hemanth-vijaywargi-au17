// Initial State
const initialState = {};
  
// Reducer
const actorReducer = (state = initialState, action) => {

    if(action.type==="GET_ACTOR"){
        let stateObj = state
        let id = action.payload.imdb_id
        stateObj[id] = action.payload
        return stateObj
    }

    return state
};

export default actorReducer