import MovieCard from "./MovieCard";
import React from "react";
import { connect } from "react-redux";
import Carousel from "./Carousel";

function Home(props) {
  let { now_playing, top_rated, upcoming, watchlist, isLoggedIn,movies } = props;
  return (
    <>
      <Carousel />
      <div className="bg-gray-900 text-white space-y-5 py-4">
        {/*Now Playing*/}
        <div>
          <h2 className="text-4xl text-center font-bold">Now Playing</h2>
          {now_playing.length !== 0 ? (
            <div className="flex flex-wrap justify-center gap-3 m-5">
              {now_playing.map((movieId) => {
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
          ) : null}
        </div>
        {/*Top Rated*/}
        <div>
          <h2 className="text-4xl text-center font-bold">Top Rated Movies</h2>
          {top_rated.length !== 0 ? (
            <div className="flex flex-wrap justify-center gap-3 m-5">
              {top_rated.map((movieId) => {
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
          ) : null}
        </div>
        {/*Upcoming*/}
        <div>
          <h2 className="text-4xl text-center font-bold">Upcoming Movies</h2>
          {upcoming.length !== 0 ? (
            <div className="flex flex-wrap justify-center gap-3 m-5">
              {upcoming.map((movieId) => {
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
          ) : null}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    now_playing: state.sections.now_playing,
    top_rated: state.sections.top_rated,
    upcoming: state.sections.upcoming,
    watchlist: state.user.watchlist,
    isLoggedIn: state.user.isLoggedIn,
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
