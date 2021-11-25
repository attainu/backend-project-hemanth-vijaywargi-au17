import React, { useState } from "react";
import { connect } from "react-redux";

function Carousel(props) {
  const [currImg, setCurrImg] = useState(0);
  let backdrop_size = "w780";

  let now_playing_movies = [];

  for (let i = 0; i < props.now_playing.length; i++) {
    let movieId = props.now_playing[i];
    let movie = props.movies[movieId];
    if (movie !== undefined && movie.backdrop_path !== "") {
      now_playing_movies.push(movie);
    }
  }

  return (
    <>
      {now_playing_movies.length !== 0 ? (
        <div className="w-full h-96 bg-black select-none">
          {/*Carousel Inner*/}
          <div
            className="w-full h-full flex"
            style={{
              backgroundImage: `url(${
                `https://image.tmdb.org/t/p/${backdrop_size}` +
                now_playing_movies[currImg].backdrop_path
              })`,
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
                  setCurrImg(now_playing_movies.length - 1);
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
            <div className="w-10/12 h-full flex flex-col justify-between items-center">
              {/* Movie TagLine */}
              <div className="bg-gray-500 text-xl bg-opacity-60 text-gray-200 px-4 rounded-5 m-1 rounded font-bold">
                {now_playing_movies[currImg].tagline}
              </div>
              {/* Movie Name */}
              <div className="bg-gray-500 text-3xl bg-opacity-60 text-gray-200 px-4 rounded-5 m-1 rounded font-bold">
                {now_playing_movies[currImg].name}
              </div>
            </div>
            {/* Right Button */}
            <div
              className="w-1/12 h-full  cursor-pointer flex justify-center items-center hover:bg-hover"
              onClick={() => {
                if (currImg === now_playing_movies.length - 1) {
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    now_playing: state.sections.now_playing,
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
