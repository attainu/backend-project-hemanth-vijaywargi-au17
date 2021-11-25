import { useParams } from "react-router";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import actions from "../Actions";
import { Fragment, useEffect, useState } from "react";
import ActorCard from "./ActorCard";

function MovieInfo(props) {
  let params = useParams();
  let id = params.id;
  let movie = props.movies[id];
  let [trailerPlayState, setTrailerPlayState] = useState(false);
  let backdrop_size = "w780";

  let actors;
  let production_companies;
  let castComponents;

  useEffect(() => {
    if (movie !== undefined) {
      props.getActorsInfo(movie.actors);
    }
  }, []);

  if (movie === undefined) {
    props.getMovieById(id);
  } else {
    actors = [];
    for (let i = 0; i < movie.actors.length; i++) {
      actors.push(movie.actors[i].actor_info.name);
      if (i === 4) {
        break;
      }
    }

    actors = actors.join(" , ");

    production_companies = [];
    for (let i = 0; i < movie.production_companies.length; i++) {
      if (
        movie.production_companies[i].logo_path !== null &&
        movie.production_companies[i].logo_path.length !== 0
      ) {
        let logo = (
          <div className="bg-white p-2 rounded m-2">
            <img
              className="h-10"
              src={
                "https://image.tmdb.org/t/p/w92" +
                movie.production_companies[i].logo_path
              }
              alt=""
            />
          </div>
        );
        production_companies.push(logo);
      }
    }

    castComponents = [];
    for (let i = 0; i < movie.actors.length; i++) {
      let actorInfo = props.actors[movie.actors[i].actor_info.imdb_id];
      if (actorInfo !== undefined && actorInfo.error !== true) {
        castComponents.push(
          <ActorCard details={actorInfo} role={movie.actors[i].role} />
        );
      } else {
        castComponents.push(null);
      }
      if (i === 10) {
        break;
      }
    }
  }

  let removeBtn = () => {
    return (
      <Fragment>
        <svg
          class="w-6 h-6 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>Remove From WatchList</span>
      </Fragment>
    );
  };
  let addBtn = () => {
    return (
      <Fragment>
        <svg
          class="w-6 h-6 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>Add To WatchList</span>
      </Fragment>
    );
  };
  let [watchListBtn, setWatchListBtn] = useState(
    props.watchList.includes(id) ? removeBtn : addBtn
  );

  const handleWatchListBtn = () => {
    if (props.watchList.includes(id)) {
      props.removeFromWatchList(id);
      setWatchListBtn(addBtn);
    } else {
      props.addToWatchList(id);
      setWatchListBtn(removeBtn);
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
            <img
              src={`https://image.tmdb.org/t/p/${backdrop_size}${movie.backdrop_path}`}
              alt="Not Available"
            />
          </div>
          <div>
            <div className="w-full font-extrabold mb-3  p-5 pl-0 ml-10 text-white text-3xl">
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
          <div className="p-5 text-white text-opacity-50 flex flex-wrap items-center">
            <button
              className="m-4 p-2 bg-blue-900 rounded hover:text-white flex space-x-2"
              onClick={handleWatchListBtn}
              style={{
                display: props.isLoggedIn ? "" : "none",
              }}
            >
              {watchListBtn}
            </button>
            {movie.trailer_link !== "" ? (
              <a href="#trailer">
                <button
                  className="m-4 p-2 bg-blue-900 rounded hover:text-white"
                  onClick={() => {
                    setTrailerPlayState(!trailerPlayState);
                  }}
                >
                  Watch trailer
                </button>
              </a>
            ) : null}
          </div>
          <div className="ml-10 m-2 text-opacity-50 text-white space-y-3">
            <div className="space-x-3">
              <span>Starring : </span>
              <span>{actors || "NA"}</span>
            </div>

            <div className="space-x-3">
              <span>Directed By : </span>
              <span>
                {movie.directors.map((director) => director.name).join(" , ") ||
                  "NA"}
              </span>
            </div>

            <div className=" space-x-3">
              <span>Writers : </span>
              <span>
                {movie.writers.map((writer) => writer.name).join(" , ") || "NA"}
              </span>
            </div>

            <div className="space-x-3">
              <span>Genre : </span>
              <span>{movie.genres.join(" , ")}</span>
            </div>

            <div className="space-x-3">
              <span>Available in Languages : </span>
              <span>{movie.languages.join(" , ")}</span>
            </div>
          </div>
          {/*Cast Section*/}
          {castComponents.length !== 0 ? (
            <div className="my-3">
              <h2 className="text-4xl my-2 text-white text-center">Cast</h2>
              <div className="flex flex-wrap justify-center">
                {castComponents}
              </div>
            </div>
          ) : null}
          {movie.trailer_link !== "" ? (
            <div
              className="h-screen w-full flex justify-center items-center flex-col"
              id="trailer"
            >
              <h2 className="text-4xl text-white text-center my-4">Trailer</h2>
              <ReactPlayer
                width="75%"
                height="75%"
                url={`https://www.youtube.com/embed/${movie.trailer_link}`}
                controls={true}
                playing={trailerPlayState}
              ></ReactPlayer>
            </div>
          ) : null}
          {production_companies.length !== 0 ? (
            <div className="flex space-y-3 items-center flex-col text-white mb-10">
              <div className="text-2xl">Produced By </div>
              <div className="flex flex-wrap space-x-4">
                {production_companies}
              </div>
            </div>
          ) : null}
        </div>
      ) : id === null ? (
        <div className="text-white text-2xl text-center">
          No Info Available :(
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
    },
    getActorsInfo: (actors) => {
      actors.forEach((actor) => {
        dispatch(actions.getActorById(actor.actor_info.imdb_id));
      });
    },
    removeFromWatchList: (id) => {
      dispatch(actions.removeFromWatchList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
