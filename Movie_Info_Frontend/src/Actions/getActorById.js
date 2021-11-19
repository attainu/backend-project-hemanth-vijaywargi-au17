import axios from "axios";

// Action Creator
const getActorById = (id) => {
  return async (dispatch, getState) => {
    let response = await axios.get(`/actor/by_imdb_id?imdb_id=${id}`);
    dispatch({
      type: "GET_ACTOR",
      payload: response.data[0],
    });
  };
};

export default getActorById