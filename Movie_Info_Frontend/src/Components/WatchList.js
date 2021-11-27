import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import actions from "../Actions";
import MovieCard from "./MovieCard";

function WatchList(props) {
  let { watchlist, isLoggedIn, getWatchlist, movies } = props;
  let navigate = useNavigate();

  useEffect(() => {
    getWatchlist();
  }, []);

  if (!isLoggedIn) {
    navigate("/login");
  }
  return (
    <div className="bg-gray-900 text-white px-20 py-6">
      <h2 className="text-4xl text-center font-bold">Your WatchList</h2>
      <div className="flex flex-wrap  gap-3 m-5">
        {watchlist.map((movieId) => {
          let inWatchlist = watchlist.includes(movieId);
          let movie = movies[movieId];
          return (
            <MovieCard
              id={movieId}
              key={movieId}
              inWatchlist={inWatchlist}
              isLoggedIn={isLoggedIn}
              movie={movie}
            />
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    watchlist: state.user.watchlist,
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWatchlist: () => {
      dispatch(actions.getWatchlist());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
