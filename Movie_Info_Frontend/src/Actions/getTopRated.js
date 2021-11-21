import axios from "axios";
import actions from '../Actions'

// Action Creator
const getTopRated = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/toprated`);
    let idArray = [];
    response.data.forEach((movie)=>{
      dispatch(actions.getMovieById(movie.imdb_id))
      idArray.push(movie.imdb_id)
    })
    dispatch({
      type: "GET_TOP_RATED",
      payload: idArray,
    });
  };
};

export default getTopRated
