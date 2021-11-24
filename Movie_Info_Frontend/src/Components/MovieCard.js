import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function MovieCard(props) {
  let movie = props.movies[props.id];
  let poster_size = "w185";
  const [image,setImage] = useState("")

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
        <Link
          to={`/movieinfo/${props.id}`}
          className="rounded overflow-hidden shadow-lg max-w-sm w-40 text-center inline-flex flex-col justify-between items-center bg-gray-800 pb-2"
        >
          <img
            src={`https://image.tmdb.org/t/p/${poster_size}${movie.poster_path}`}
            onError={()=>{setImage("")}}
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
        </Link>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    isLoggedIn: state.user.isLoggedIn,
    watchList: state.user.watchlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
