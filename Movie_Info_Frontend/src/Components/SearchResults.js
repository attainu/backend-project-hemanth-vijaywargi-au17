import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import actions from "../Actions";
import React from "react";
import SearchResult from './SearchResult'

function SearchResults(props) {
  let params = useParams();
  let query = params.query;
  let { getSearchResults, search_results } = props;

  useEffect(() => {
    getSearchResults(query);
  }, [getSearchResults, query]);

  return (
    <div className="py-5 text-white">
      <div className="text-3xl text-center  my-5">
        Search Results for "{query}" :
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {search_results.length!==0?search_results.map((movie) => {
          if (movie.imdb_id !== "" && movie.imdb_id !== null) {
            return <SearchResult movie={movie} />;
          } else {
            return null;
          }
        }):"No Results Found"}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    search_results: state.sections.search_results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: (query) => {
      dispatch(actions.getSearchResults(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
