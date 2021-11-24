import axios from "axios";

// Action Creator
const getMovieById = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().movies) {
      dispatch({
        type: "MOVIE_DATA_ALREADY_PRESENT",
      });
    } else {
      let response = await axios.get(`/movie/by_id?id=${id}`);
      if (response.data.error || response.data[0]===undefined) {
        dispatch({
          type: "MOVIE_DATA_NOT_FOUND",
        });
      } else {
        dispatch({
          type: "GET_MOVIE",
          payload: response.data[0],
        });
      }
    }
  };
};

export default getMovieById;
