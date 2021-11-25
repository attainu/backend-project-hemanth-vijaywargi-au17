import axios from "axios";
import actions from ".";

// Action Creator
const addToWatchList = (id) => {
  return async (dispatch, getState) => {
    let url = `/user/watchlist/add`;
    let body = {
      movie_id: id,
    };
    let options = {
      headers: {
        token: getState().user.token,
      },
    };
    await axios.patch(url, body, options);

    dispatch({
      type: "ADD_TO_WATCHLIST",
      payload:id
    });
    dispatch(actions.getWatchlist());
  };
};

export default addToWatchList;
