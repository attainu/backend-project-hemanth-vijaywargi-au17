import { connect } from "react-redux";

function MovieCard(props) {
  let details = props.movies[props.id];

  const determineColor = (rating) => {
    if (rating < 5 && rating > 0) {
      return "hsl(0,100%,40%)";
    } else if (rating >= 5 && rating <= 7) {
      return "hsl(60,100%,30%)";
    } else if (rating === 0) {
      return "";
    } else {
      return "green";
    }
  };

  return (
    <>
      {details !== undefined ? (
        <div className="rounded overflow-hidden shadow-lg max-w-sm w-40 text-center inline-flex flex-col justify-between items-center bg-gray-800 pb-2">
          <img
            src={details.poster_path}
            alt="Not available"
            className="w-full h-60"
          />
          <div className="font-bold text-sm mb-2 p-2">{details.name}</div>
          <div
            className="bg-gray-500 rounded-full px-3 py-1 mb-2 text-small text-white font-bold p-2 w-20"
            style={{
              backgroundColor: determineColor(details.rating),
            }}
          >
            {details.rating===0?"NA":details.rating}
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
