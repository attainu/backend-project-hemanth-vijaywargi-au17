import { useState } from "react";
import React from "react";
import Joi from "joi";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const userSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: {} })
      .required()
      .min(4)
      .lowercase()
      .label("E-Mail"),
    pass: Joi.string().required().min(6).max(16).label("Password"),
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const result = userSchema.validate({ email: email, pass: password });

    if (result.error) {
      setValidationError(result.error);
      console.log(result.error);
    } else {
      let userExists = false;
      if (!userExists) {
        setValidationError({ message: "User Does Not Exist!" });
      } else {
        setValidationError("");
      }
    }
  };
  return (
    <div>
      <div className="main">
        <div className="container">
          <div className="signup-content">
            <form
              method="POST"
              id="signup-form"
              className="signup-form"
              onSubmit={handleSubmitForm}
              noValidate
            >
              <h2>Login</h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="form-group message">
                {validationError.message}
              </div>
              <button className="submit-form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
              <span className="existing">
                <span>Not a member ?</span>
                <Link to='/signup'>Sign Up</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
