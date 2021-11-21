import axios from "axios";
import actions from ".";

// Action Creator
const getNowPlaying = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/nowplaying`);
    let idArray = [];
    response.data.forEach((movie)=>{
      dispatch(actions.getMovieById(movie.imdb_id))
      idArray.push(movie.imdb_id)
    })
    dispatch({
      type: "GET_NOW_PLAYING",
      payload: idArray,
    });
  };
};

export default getNowPlaying