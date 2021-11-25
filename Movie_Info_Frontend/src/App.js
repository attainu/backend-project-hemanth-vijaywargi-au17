import "./App.css";
import Login from "./Components/forms/login";
import SignUp from "./Components/forms/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { useEffect } from "react";
import { connect } from "react-redux";
import actions from "./Actions";
import NavBar from "./Components/NavBar";
import WatchList from "./Components/WatchList";
import MovieInfo from "./Components/MovieInfo";
import ScrollToTop from "./Components/ScrollToTop";
import SearchResults from "./Components/SearchResults";

function App(props) {
  let { getAllSections, isLoggedIn, getWatchlist } = props;

  useEffect(() => {
    if (isLoggedIn) {
      getWatchlist();
    }
    getAllSections();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movieinfo/:id" element={<MovieInfo />} />
        <Route path="/search_results/:query" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSections: () => {
      dispatch(actions.getNowPlaying());
      dispatch(actions.getTopRated());
      dispatch(actions.getUpcoming());
    },
    getWatchlist: () => {
      dispatch(actions.getWatchlist());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
