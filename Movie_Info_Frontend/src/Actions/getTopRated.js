import axios from "axios";

// Action Creator
const getTopRated = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/toprated`);
    dispatch({
      type: "GET_TOP_RATED",
      payload: response.data,
    });
  };
};

export default getTopRated