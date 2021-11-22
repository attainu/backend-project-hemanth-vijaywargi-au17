import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import MovieCard from "./MovieCard";

function WatchList(props) {
  if (!props.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="bg-gray-900 h-screen text-white px-20 py-6">
      <h2 className="text-4xl text-center font-bold">Your WatchList</h2>
      <div className="flex flex-wrap  gap-3 m-5">
        {props.watchList.map((movieId)=>{
          return <MovieCard id={movieId}/>
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    watchList: state.user.watchlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
