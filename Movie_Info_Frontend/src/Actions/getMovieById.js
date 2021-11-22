import axios from "axios";

// Action Creator
const getMovieById = (id) => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/by_id?id=${id}`);
    if (response.data.error || response.data.length === 0 || (id in getState().movies)) {
      dispatch({
        type: "FALTU_ACTION",
      });
    } else {
      dispatch({
        type: "GET_MOVIE",
        payload: response.data[0],
      });
    }
  };
};

export default getMovieById;
