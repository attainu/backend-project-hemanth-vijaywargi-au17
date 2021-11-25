import axios from "axios";

// Action Creator
const removeFromWatchList = (id) => {
  return async (dispatch, getState) => {
    let options = {
      headers: {
        token: getState().user.token,
      },
    };
    await axios.patch(`/user/watchlist/remove`, {
        movie_id : id
    },options);
    
    dispatch({
      type: "REMOVE_FROM_WATCHLIST",
      payload:id
    });
  };
};

export default removeFromWatchList;