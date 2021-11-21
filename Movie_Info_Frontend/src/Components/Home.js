import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import React from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

function Home() {
  let now_playing = useSelector((state) => state.sections.now_playing);
  let top_rated = useSelector((state) => state.sections.top_rated);
  let upcoming = useSelector((state) => state.sections.upcoming);

  return (
    <>
      <NavBar />
      {/* <Carousel /> */}
      <div className="bg-gray-900 text-white space-y-5 py-4">
        {/*Now Playing*/}
        <div>
          <h2 className="text-4xl text-center font-bold">Now Playing</h2>
          {now_playing.length !== 0 ? (
            <div className="flex flex-wrap justify-center gap-3 m-5">
              {now_playing.map((movieId) => {
                return <MovieCard id={movieId} />;
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
                return <MovieCard id={movieId} />;
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
                return <MovieCard id={movieId} />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home;
