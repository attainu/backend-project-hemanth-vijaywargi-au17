// Initial State
const initialState = {};

// Reducer
const actorReducer = (state = initialState, action) => {
  if (action.type === "GET_ACTOR" || action.type === "ACTOR_DATA_NOT_FOUND") {
    let stateObj = {};
    Object.assign(stateObj, state);
    let id = action.payload.imdb_id;
    stateObj[id] = action.payload;
    return stateObj;
  }

  return state;
};

export default actorReducer;
