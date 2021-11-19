import axios from "axios";

// Action Creator
const getMovieById = (id, type) => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/by_id?id=${id}&type=${type}`);
    dispatch({
      type: "GET_MOVIE",
      payload: response.data[0],
    });
  };
};

export default getMovieById