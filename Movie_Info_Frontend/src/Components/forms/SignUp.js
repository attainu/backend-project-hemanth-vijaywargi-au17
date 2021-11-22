import { useState } from "react";
import React from "react";
import Joi from "joi";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const userSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required()
      .label("Username"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: {  } })
      .required()
      .min(4)
      .lowercase()
      .label("E-Mail"),
    pass: Joi.string()
      .required()
      .min(6)
      .max(16)
      .label("Password"),
    repeat_password: Joi.any()
      .label("Confirm password")
      .equal(Joi.ref("pass"))
      .required()
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const result = userSchema.validate({
      username: username,
      email: email,
      pass: password,
      repeat_password: confirmpassword,
    });
    console.log(result);
    console.log(result.error);
    console.log(validationError.email);
    if (result.error) {
      setValidationError(result.error);
    } else {
      setValidationError(result);
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
            >
              <h2>Sign Up</h2>
              <div className="form-group">
                <input
                  type="username"
                  className="form-input"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="confirm-password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  value={confirmpassword}
                />
              </div>
              <div className=" message">{validationError.message}</div>
              <button className="submit-form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </button>
              <span className="existing">
                <span>Already a Member ?</span>
                <Link to="/login">Log In</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default SignUp;
