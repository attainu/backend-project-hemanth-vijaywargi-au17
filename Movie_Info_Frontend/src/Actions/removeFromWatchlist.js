import axios from "axios";

// Action Creator
const removeFromWatchList = (id) => {
  return async (dispatch, getState) => {
    await axios.patch(`/user/watchlist/remove`, {
        movie_id : id
    });
    
    dispatch({
      type: "REMOVE_FROM_WATCHLIST",
      payload: id,
    });
  };
};

export default removeFromWatchList;