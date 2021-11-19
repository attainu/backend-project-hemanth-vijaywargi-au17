// Initial State
const initialState = {
  now_playing: [],
  top_rated: [],
  upcoming: [],
};

// Reducer
const sectionReducer = (state = initialState, action) => {
  if (action.type === "GET_NOW_PLAYING") {
    return {
      ...state,
      now_playing: [...state.now_playing, ...action.payload],
    };
  }

  if (action.type === "GET_TOP_RATED") {
    return {
        ...state,
        top_rated: [...state.top_rated, ...action.payload],
      };
  }

  if (action.type === "GET_UPCOMING") {
    return {
        ...state,
        upcoming: [...state.upcoming, ...action.payload],
      };
  }

  return state;
};

export default sectionReducer;
