import "./App.css";
import Login from "./Components/forms/login";
import SignUp from "./Components/forms/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import {Provider} from 'react-redux'
import myAppStore from "./Store";
import ReduxExample from './Components/ReduxExample'

function App() {

  return (
    <Provider store={myAppStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      <ReduxExample/>
    </Provider>
  );
}

export default App;
