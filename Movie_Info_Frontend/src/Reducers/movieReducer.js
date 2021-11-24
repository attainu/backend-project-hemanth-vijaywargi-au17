// Initial State
const initialState = {};

// Reducer
const movieReducer = (state = initialState, action) => {
  if (action.type === "GET_MOVIE") {
    let stateObj = {};
    Object.assign(stateObj, state);
    let imdb_id = action.payload.IMDB_id;
    stateObj[imdb_id] = action.payload;
    return stateObj;
  }

  return state;
};

export default movieReducer;
