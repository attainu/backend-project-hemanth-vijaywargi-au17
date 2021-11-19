import axios from "axios";

// Action Creator
const getUpcoming = () => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/movie/upcoming`);
    dispatch({
      type: "GET_UPCOMING",
      payload: response.data,
    });
  };
};

export default getUpcoming