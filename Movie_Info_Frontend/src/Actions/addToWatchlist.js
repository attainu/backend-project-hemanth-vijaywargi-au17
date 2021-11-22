import axios from "axios";

// Action Creator
const addToWatchList = (id) => {
  return async (dispatch, getState) => {
    await axios.patch(`/user/watchlist/add`, {
        movie_id : id
    });
    
    dispatch({
      type: "ADD_TO_WATCHLIST",
      payload: id,
    });
  };
};

export default addToWatchList;
