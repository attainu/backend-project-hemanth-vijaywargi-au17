import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import React, { useState } from "react";
import {  useSelector } from "react-redux";

function Home() {
  let now_playing = useSelector((state) => state.sections.now_playing);
  let top_rated = useSelector((state) => state.sections.top_rated);
  let upcoming = useSelector((state) => state.sections.upcoming);
  const [currImg, setCurrImg] = useState(0);

  return (
    <>
      <NavBar />
      <div>
        {now_playing.length !== 0 ? (
          <div className="w-full h-96 bg-black select-none">
            {/*Carousel Inner*/}
            <div
              className="w-full h-full flex"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${now_playing[currImg].backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              {/* Left Button */}
              <div
                className="w-1/12 h-full cursor-pointer flex justify-center items-center hover:bg-hover"
                onClick={() => {
                  if (currImg === 0) {
                    setCurrImg(now_playing.length - 1);
                  } else {
                    setCurrImg(currImg - 1);
                  }
                }}
              >
                <svg
                  className="w-10 h-10 opacity-100 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </div>
              {/* Center Div */}
              <div className="w-10/12 h-full flex justify-center items-end">
                {/* Image Description */}
                <div className="bg-white text-black px-4 rounded-5 m-1">
                  {now_playing[currImg].title}
                </div>
              </div>
              {/* Right Button */}
              <div
                className="w-1/12 h-full  cursor-pointer flex justify-center items-center hover:bg-hover"
                onClick={() => {
                  if (currImg === now_playing.length - 1) {
                    setCurrImg(0);
                  } else {
                    setCurrImg(currImg + 1);
                  }
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ) : null}

        {/*Now Playing*/}
        {/* <div>
          <h2 className="text-4xl">Now Playing</h2>
          <div className="flex flex-wrap gap-3">
            {now_playing.map((movie) => {
              return <MovieCard data={movie} />;
            })}
          </div>
        </div> */}
        {/*Top Rated*/}
        {/* <div>
          <h2 className="text-4xl">Top Rated</h2>
          <div className="flex flex-wrap gap-3">
            {top_rated.map((movie) => {
              return <MovieCard data={movie} />;
            })}
          </div>
        </div> */}
        {/*Upcoming*/}
        {/* <div>
          <h2 className="text-4xl">Upcoming</h2>
          <div className="flex flex-wrap gap-3">
            {upcoming.map((movie) => {
              return <MovieCard data={movie} />;
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
