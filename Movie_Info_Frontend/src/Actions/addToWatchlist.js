import axios from "axios";

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
  };
};

export default addToWatchList;
