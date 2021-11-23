// Initial State
const initialState = {
  isLoggedIn: Boolean(localStorage.getItem("userLoggedIn")) || false,
  token: localStorage.getItem("userToken") || null,
  error_message: "",
  signup_error_message: "",
  watchlist: [],
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

  if (action.type === "USER_LOG_OUT") {
    return {
      ...state,
      isLoggedIn: false,
      token: null,
      error_message: "",
    };
  }

  if (action.type === "CLEAR_ERROR_MESSAGE") {
    return {
      ...state,
      error_message: "",
      signup_error_message: "",
    };
  }

  if (action.type === "GET_WATCHLIST") {
    return {
      ...state,
      watchlist: action.payload,
    };
  }

  if (action.type === "SIGNUP_FAILED") {
    return {
      ...state,
      signup_error_message: action.payload,
    };
  }

  if (action.type === "SIGNUP_SUCCESS") {
    return {
      ...state,
      signup_error_message: action.payload,
    };
  }


  return state;
};

export default userReducer;
