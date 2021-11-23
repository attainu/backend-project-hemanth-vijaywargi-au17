import { useParams } from "react-router";
import "./Movie.css";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import actions from "../Actions";
import { useState } from "react";

function MovieInfo(props) {
  let params = useParams();
  let id = params.id;
  let movie = props.movies[id];

  let writers;
  let directors;
  let actors;
  let languages;
  let production_companies;

  if (movie === undefined) {
    props.getMovieById(id);
  } else {
    directors = movie.directors
      .map((director) => {
        return director.name;
      })
      .join(" , ");

    actors = [];
    for (let i = 0; i < movie.actors.length; i++) {
      actors.push(movie.actors[i].actor_info.name);
      if (i === 4) {
        break;
      }
    }

    actors = actors.join(" , ");

    writers = movie.writers
      .map((writer) => {
        return writer.name;
      })
      .join(" , ");

    languages = movie.languages.join(" , ");

    production_companies = [];
    for (let i = 0; i < movie.production_companies.length; i++) {
      if (movie.production_companies[i].logo_path.length !== 0) {
        let logo = (
          <div className="bg-white p-2 rounded m-2">
            <img
              className="h-10"
              src={movie.production_companies[i].logo_path}
              alt=""
            />
          </div>
        );
        production_companies.push(logo);
      }
    }
  }

  let [watchListBtn, setWatchListBtn] = useState(
    props.watchList.includes(id) ? "Remove From WatchList" : "Add To WatchList"
  );

  const handleWatchListBtn = () => {
    if (props.watchList.includes(id)) {
      props.removeFromWatchList(id);
      setWatchListBtn("Add To WatchList");
    } else {
      props.addToWatchList(id);
      setWatchListBtn("Remove From WatchList");
    }
  };

  const determineColor = (rating) => {
    if (rating === null) {
      return "";
    } else if (rating < 5) {
      return "hsl(0,100%,40%)";
    } else if (rating >= 5 && rating <= 7) {
      return "hsl(60,100%,30%)";
    } else {
      return "green";
    }
  };

  return (
    <>
      {movie !== undefined ? (
        <div className="bg-black overflow-hidden">
          <div className="float-right w-full md:w-1/2 md:h-1/2 lg:float-right backdrop ">
            <img src={movie.backdrop_path} alt="Not Available" />
          </div>
          <div>
            <div className="w-full font-extrabold mb-3  p-5 pl-0 ml-10 text-white text-2xl">
              {movie.name}
            </div>
            <div className="p-3 text-white pl-0 ml-8 space-x-2">
              <span className="bg-gray-700 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20">
                {movie.runtime}
              </span>
              <span className="bg-gray-700 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20">
                {movie.release_date}
              </span>
              <span className="bg-gray-700 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20">
                {movie.adult ? "Adult" : "Any Age"}
              </span>
              <span
                className="bg-gray-500 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20"
                style={{
                  backgroundColor: determineColor(movie.rating),
                }}
              >
                {movie.rating === null ? "Unrated" : movie.rating}
              </span>
            </div>
          </div>
          <div className="pt-3 ml-10 text-white">
            {movie.tagline.length !== 0 ? (
              <div className="my-3 text-xl">{movie.tagline}</div>
            ) : null}
            <label>{movie.overview}</label>
          </div>
          <div className="p-5 text-white text-opacity-50">
            <button
              className="m-4 p-2 bg-blue-900 rounded hover:text-white"
              onClick={handleWatchListBtn}
              style={{
                display: props.isLoggedIn ? "" : "none",
              }}
            >
              {watchListBtn}
            </button>
            <a href="#trailer">
              <button className="m-4 p-2 bg-blue-900 rounded hover:text-white">
                Watch trailer
              </button>
            </a>
          </div>
          <div className="ml-10 m-2 text-opacity-50 text-white space-y-3">
            <div className="space-x-3">
              <span>Starring : </span>
              <span>{actors || "NA"}</span>
            </div>

            <div className="space-x-3">
              <span>Directed By : </span>
              <span>{directors || "NA"}</span>
            </div>

            <div className=" space-x-3">
              <span>Writers : </span>
              <span>{writers || "NA"}</span>
            </div>

            <div className="space-x-3">
              <span>Genre : </span>
              <span>{movie.genres.join(" , ")}</span>
            </div>

            <div className="space-x-3">
              <span>Available in Languages : </span>
              <span>{languages}</span>
            </div>
          </div>

          <div
            className="h-screen w-full flex justify-center items-center"
            id="trailer"
          >
            <ReactPlayer
              width="95%"
              height="95%"
              url={`https://www.youtube.com/embed/${movie.trailer_link}`}
              controls={true}
            ></ReactPlayer>
          </div>
          {production_companies.length !== 0 ? (
            <div className="flex space-x-3 items-center text-white ml-10 m-2">
              <span>Produced By </span>
              <div className="flex flex-wrap space-x-4">
                {production_companies}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    movies: state.movies,
    watchList: state.user.watchlist,
    actors: state.actors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieById: (id) => {
      dispatch(actions.getMovieById(id));
    },
    addToWatchList: (id) => {
      dispatch(actions.addToWatchList(id));
      dispatch(actions.getWatchlist());
    },
    removeFromWatchList: (id) => {
      dispatch(actions.removeFromWatchList(id));
      dispatch(actions.getWatchlist());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
