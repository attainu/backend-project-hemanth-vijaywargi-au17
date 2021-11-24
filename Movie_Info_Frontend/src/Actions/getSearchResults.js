import axios from "axios";

// Action Creator
const getSearchResults = (query) => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/search?query=${query}`);
    dispatch({
      type: "GET_SEARCH_RESULTS",
      payload: response.data,
    });
  };
};

export default getSearchResults