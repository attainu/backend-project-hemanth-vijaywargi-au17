import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div>
      <div className="main">
        <div className="container">
          <div className="signup-content">
            <form method="POST" id="signup-form" class="signup-form">
              <h2>Login</h2>
              <div className="form-group">
                <input
                  type="username"
                  className="form-input"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <button className="submit-form">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <span className="existing">Not a member<a href="/login">sign up</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
