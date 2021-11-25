import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import actions from "../Actions";

function NavBar(props) {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  const handleSearch = () => {
    if (query !== "") {
      navigate(`/search_results/${query}`);
      setQuery("")
    }
  };

  return (
    <div className="flex justify-between bg-gray-900 py-3 px-16 text-gray-400 font-bold">
      {/*Nav Brand*/}
      <Link className="flex items-center space-x-4" to="/">
        <svg
          className="w-16 h-16 hover:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          ></path>
        </svg>
        <h1 className="text-3xl font-bold ">Movie Info App</h1>
      </Link>

      {/*Navigation*/}
      <nav className="flex">
        {/*Search*/}
        <div className="flex items-center mr-28">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                onClick={handleSearch}
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="text-gray-900 w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="py-2 text-sm bg-gray-400 text-gray-900 rounded-md pl-10 placeholder-gray-900"
              placeholder="Search..."
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>

        {/*Links*/}
        {props.isLoggedIn ? (
          <div className="flex items-center space-x-1">
            <div
              className="hover:bg-hover px-3 py-2 rounded cursor-pointer"
              onClick={props.logout}
            >
              Log out
            </div>

            <Link
              className="hover:bg-hover px-3 py-2 rounded"
              to="/watchlist"
            >
              Watch List
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Link className="hover:bg-hover px-3 py-2 rounded" to="/login">
              Login
            </Link>

            <Link className="hover:bg-hover px-3 py-2 rounded" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.userLogOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
