import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import actions from "../Actions";
import MovieCard from "./MovieCard";

function WatchList() {
  let watchlist = useSelector((state) => {
    return state.user.watchlist;
  });
  let isLoggedIn = useSelector((state) => {
    return state.user.isLoggedIn;
  });

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getWatchlist())
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="bg-gray-900 text-white px-20 py-6">
      <h2 className="text-4xl text-center font-bold">Your WatchList</h2>
      <div className="flex flex-wrap  gap-3 m-5">
        {watchlist.map((movieId) => {
          return <MovieCard id={movieId} />;
        })}
      </div>
    </div>
  );
}

export default WatchList;
