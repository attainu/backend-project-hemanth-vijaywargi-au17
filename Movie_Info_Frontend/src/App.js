import "./App.css";
import Login from "./Components/forms/login";
import SignUp from "./Components/forms/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "./Actions";
import NavBar from "./Components/NavBar";
import WatchList from "./Components/WatchList";

function App() {
  let dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.getNowPlaying());
    dispatcher(actions.getTopRated());
    dispatcher(actions.getUpcoming());
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
