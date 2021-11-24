import {Link} from 'react-router-dom'

export default function SearchResult(props) {
    let {movie} = props
    let poster_size = "w342"
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
        <Link
          to={`/movieinfo/${movie.IMDB_id}`}
          className="rounded overflow-hidden shadow-lg max-w-sm w-40 text-center inline-flex flex-col justify-between items-center text-white bg-gray-800 pb-2"
        >
          <img
            src={`https://image.tmdb.org/t/p/${poster_size}${movie.poster_path}`}
            alt="Poster Not available"
            className="w-full h-60"
          />
          <div className="font-bold text-sm mb-2 p-2">{movie.title}</div>
          <div
            className="bg-gray-500 rounded-full px-3 py-1 mb-2 text-small font-bold p-2 w-20"
            style={{
              backgroundColor: determineColor(movie.vote_average),
            }}
          >
            {movie.vote_average === null ? "Unrated" : movie.vote_average}
          </div>
        </Link>
      </>
    );
  }