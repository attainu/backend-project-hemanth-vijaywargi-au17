import "./App.css";
import Login from "./Components/forms/login";
import SignUp from "./Components/forms/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import actions from "./Actions";
import NavBar from "./Components/NavBar";
import WatchList from "./Components/WatchList";
import MovieInfo from './Components/MovieInfo';
import ScrollToTop from './Components/ScrollToTop';
import Cast from './Components/Cast'

function App(props) {
  let dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.getNowPlaying());
    dispatcher(actions.getTopRated());
    dispatcher(actions.getUpcoming());
    if(props.isLoggedIn){
      dispatcher(actions.getWatchlist())
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <ScrollToTop/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movieinfo/:id" element={<MovieInfo />} />
        <Route path="/cast" element={<Cast />} />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

