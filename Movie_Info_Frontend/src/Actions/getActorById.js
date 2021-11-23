import axios from "axios";

// Action Creator
const getActorById = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().actors) {
      dispatch({
        type: "ACTOR_DATA_ALREADY_PRESENT",
      });
    } else {
      let response = await axios.get(`/actor/by_imdb_id?imdb_id=${id}`);
      if (response.data.error || response.data.length === 0) {
        dispatch({
          type: "ACTOR_DATA_NOT_FOUND",
        });
      } else {
        dispatch({
          type: "GET_ACTOR",
          payload: response.data[0],
        });
      }
    }
  };
};

export default getActorById;
