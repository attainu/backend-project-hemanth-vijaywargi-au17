// Initial State
const initialState = {
  isLoggedIn: Boolean(localStorage.getItem('userLoggedIn')) || false,
  token: localStorage.getItem('userToken') || null,
  error_message: "",
  watchlist : []
};

// Reducer
const userReducer = (state = initialState, action) => {
  if (action.type === "USER_LOGIN_FAILED") {
    return {
      ...state,
      error_message: action.payload,
    };
  }

  if (action.type === "USER_LOGIN_SUCCESS") {
    return {
      ...state,
      isLoggedIn: true,
      token: action.payload,
      error_message: "",
    };
  }

  if(action.type === "USER_LOG_OUT"){
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error_message: "",
      }
  }

  if (action.type === "CLEAR_ERROR_MESSAGE") {
    return {
      ...state,
      error_message: "",
    };
  }

  if (action.type === "GET_WATCHLIST") {
    return {
      ...state,
      watchlist: action.payload,
    };
  }

  if (action.type === "ADD_TO_WATCHLIST") {
    return {
      ...state,
      watchlist: [...state.watchlist,action.payload],
    };
  }

  if (action.type === "REMOVE_FROM_WATCHLIST") {
    let newList = [...state.watchlist]
    newList.remove(action.payload)
    return {
      ...state,
      watchlist: newList
    };
  }

  return state;
};

export default userReducer;
