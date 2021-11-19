import "./App.css";
import Login from "./component/forms/login";
import SignUp from "./component/forms/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
