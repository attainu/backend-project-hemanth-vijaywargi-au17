import axios from "axios";

// Action Creator
const getNowPlaying = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/nowplaying`);
    dispatch({
      type: "GET_NOW_PLAYING",
      payload: response.data,
    });
  };
};

export default getNowPlaying