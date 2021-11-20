import "./App.css";
import Login from "./Components/forms/login";
import SignUp from "./Components/forms/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "./Actions";

function App() {
  let dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.getNowPlaying());
    // dispatcher(actions.getTopRated());
    // dispatcher(actions.getUpcoming());
    // dispatcher(actions.getActorById("nm0474774"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
