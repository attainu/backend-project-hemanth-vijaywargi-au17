import axios from "axios";
import actions from ".";

// Action Creator
const getMovieById = (id) => {
  return async (dispatch, getState) => {
    if (id in getState().movies) {
      dispatch({
        type: "MOVIE_DATA_ALREADY_PRESENT",
      });
    } else {
      let response = await axios.get(`/movie/by_id?id=${id}`);
      if (response.data.error || response.data.length === 0) {
        dispatch({
          type: "MOVIE_DATA_NOT_FOUND",
        });
      } else {
        dispatch({
          type: "GET_MOVIE",
          payload: response.data[0],
        });
        // if (response.data[0].actors !== undefined) {
        //   response.data[0].actors.forEach((actor) => {
        //     dispatch(actions.getActorById(actor.actor_info.imdb_id));
        //   });
        // }
      }
    }
  };
};

export default getMovieById;
