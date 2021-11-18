import React from "react";
import "./login.css";

const Registration = () =>{
  return (
    <div>
      <div className="main">
        <div className="container">
          <div className="signup-content">
            <form method="POST" id="signup-form" className="signup-form">
              <h2>Sign Up</h2>
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
                  type="email"
                  className="form-input"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="confirm-password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                />
                <small></small>
              </div>
              <button className="submit-form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </button>
              <span className="existing">already a member<a href="/login">sign in</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
