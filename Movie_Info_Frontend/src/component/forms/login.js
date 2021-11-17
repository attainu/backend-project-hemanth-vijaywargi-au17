import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div>
      <div class="main">
        <div class="container">
          <div class="signup-content">
            <form method="POST" id="signup-form" class="signup-form">
              <h2>Login</h2>
              <div class="form-group">
                <input
                  type="username"
                  class="form-input"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <button class="submit-form">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
