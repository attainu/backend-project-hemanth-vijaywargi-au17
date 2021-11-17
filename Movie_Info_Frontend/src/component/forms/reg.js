import React from "react";
import "./login.css";

const Registration = () =>{
  return (
    <div>
      <div class="main">
        <div class="container">
          <div class="signup-content">
            <form method="POST" id="signup-form" class="signup-form">
              <h2>Sign Up</h2>
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
                  type="email"
                  class="form-input"
                  name="email"
                  id="email"
                  placeholder="Email"
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
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  name="confirm-password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <button class="submit-form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </button>
              <span class="existing">already a member<a href="/login">sign in</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
