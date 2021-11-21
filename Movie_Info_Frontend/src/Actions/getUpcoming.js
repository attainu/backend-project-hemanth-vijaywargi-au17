import axios from "axios";
import actions from "../Actions";

// Action Creator
const getUpcoming = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/upcoming`);
    let idArray = [];
    response.data.forEach((movie) => {
      dispatch(actions.getMovieById(movie.imdb_id));
      idArray.push(movie.imdb_id);
    });
    dispatch({
      type: "GET_UPCOMING",
      payload: idArray,
    });
  };
};

export default getUpcoming;
