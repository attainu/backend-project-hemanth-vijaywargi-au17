import { useState } from "react";
import Joi from "joi";
import { Link,Navigate } from "react-router-dom";
import actions from "../../Actions";
import { connect } from "react-redux";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [validationError, setValidationError] = useState("");
  if (props.error_message==="Sign Up SuccessFull!") {
    return <Navigate to="/login" />;
  }
  const userSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required()
      .label("Username"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: {} })
      .required()
      .min(4)
      .lowercase()
      .label("E-Mail"),
    pass: Joi.string().required().min(6).max(16).label("Password"),
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

    if (result.error) {
      setValidationError(result.error);
    } else {
      setValidationError("");
      props.signup(username, email, password, null);
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
                  onClick={() => {
                    props.clear_message();
                    setValidationError("");
                  }}
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
                  onClick={() => {
                    props.clear_message();
                    setValidationError("");
                  }}
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
                  onClick={() => {
                    props.clear_message();
                    setValidationError("");
                  }}
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
                  onClick={() => {
                    props.clear_message();
                    setValidationError("");
                  }}
                />
              </div>
              <div className=" message">
                {validationError.message || props.error_message}
              </div>
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

const mapStateToProps = (state) => {
  return {
    error_message: state.user.signup_error_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear_message: () => {
      dispatch({
        type: "CLEAR_ERROR_MESSAGE",
      });
    },
    signup: (username, email, password, userImage) => {
      dispatch(actions.userSignUp(username, email, password, userImage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
