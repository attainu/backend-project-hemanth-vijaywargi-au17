// import { useState } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "../Actions";

function MovieCard(props) {
  let { id, inWatchlist, isLoggedIn, movie } = props;
  let posterSize = "w185";
  let navigate = useNavigate();
  // const [image,setImage] = useState("")
  let removeIcon = (
    <svg
      className="w-6 h-6 text-red-700 group-hover:text-red-600 group-hover:bg-opacity-100 bg-gray-600 bg-opacity-40 rounded"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  let addIcon = (
    <svg
      className="w-6 h-6 text-green-500 group-hover:text-green-400 group-hover:bg-opacity-100 bg-gray-600 bg-opacity-40 rounded"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  let [svgIcon, setSvgIcon] = useState(inWatchlist ? removeIcon : addIcon);

  const handleWatchListBtn = () => {
    if (inWatchlist) {
      props.removeFromWatchList(id);
      setSvgIcon(addIcon);
    } else {
      props.addToWatchList(id);
      setSvgIcon(removeIcon);
    }
  };

  const handleClick = (e) => {
    navigate(`/movieinfo/${props.id}`);
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
        <div
          onClick={handleClick}
          className="cursor-pointer transform hover:scale-105 ease-in-out relative rounded overflow-hidden shadow-lg max-w-sm w-40 text-center inline-flex flex-col justify-between items-center bg-gray-800 pb-2"
        >
          <img
            src={`https://image.tmdb.org/t/p/${posterSize}${movie.poster_path}`}
            // onError={()=>{setImage("")}}
            alt="Poster Not available"
            className="w-full h-60"
          />
          <div className="font-bold text-sm mb-2 p-2">{movie.name}</div>
          <div
            className="bg-gray-500 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20"
            style={{
              backgroundColor: determineColor(movie.rating),
            }}
          >
            {movie.rating === null ? "Unrated" : movie.rating}
          </div>
          <button
            className="absolute top-0 right-0 m-1 group"
            onClick={(e) => {
              e.stopPropagation();
              handleWatchListBtn();
            }}
            style={{
              display: isLoggedIn ? "" : "none",
            }}
          >
            {svgIcon}
          </button>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWatchList: (id) => {
      dispatch(actions.addToWatchList(id));
    },
    removeFromWatchList: (id) => {
      dispatch(actions.removeFromWatchList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
