import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MovieCard(props) {
  const [ratingColor, setRatingColor] = useState("");
  let details = useSelector((state) => {
    let movies = state.movies;
    return movies[props.id];
  });

  const determineColor = (rating) => {
    if (rating < 5) {
      setRatingColor("hsl(0,100%,40%)");
    } else if (rating >= 5 && rating <= 7) {
      setRatingColor("hsl(60,100%,30%)");
    } else if(rating===0){
      setRatingColor("");
    }else{
      setRatingColor("green")
    }
  };

  // Component Did Update
  useEffect(() => {
    if (details !== undefined) {
      determineColor(details.rating);
    }
  });

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
              backgroundColor: ratingColor,
            }}
          >
            {details.rating}
          </div>
        </div>
      ) : null}
    </>
  );
}
