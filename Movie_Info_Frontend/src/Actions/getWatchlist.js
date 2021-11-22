import axios from "axios";
import actions from ".";

// Action Creator
const getWatchlist = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/user/watchlist`, {
      headers: {
        token: getState().user.token,
      },
    });
    let watchlist = response.data
    watchlist.forEach((movieId)=>{
      dispatch(actions.getMovieById(movieId))
    })
    dispatch({
      type: "GET_WATCHLIST",
      payload: response.data,
    });
  };
};

export default getWatchlist;
