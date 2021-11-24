import getMovieById from "./getMovieById";
import getActorById from "./getActorById";
import getNowPlaying from "./getNowPlaying";
import getTopRated from "./getTopRated";
import getUpcoming from "./getUpcoming";
import userLogin from "./userLogin";
import userLogOut from "./userLogOut";
import getWatchlist from "./getWatchlist";
import addToWatchList from "./addToWatchlist";
import removeFromWatchList from "./removeFromWatchlist";
import userSignUp from "./userSignUp";
import getSearchResults from "./getSearchResults";

const actions = {
  getMovieById,
  getNowPlaying,
  getTopRated,
  getUpcoming,
  getActorById,
  userLogin,
  userLogOut,
  getWatchlist,
  addToWatchList,
  removeFromWatchList,
  userSignUp,
  getSearchResults,
};

export default actions;
