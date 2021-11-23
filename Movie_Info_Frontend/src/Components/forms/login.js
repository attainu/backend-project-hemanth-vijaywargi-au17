import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi";
import './login.css'
import actions from "../../Actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  if (props.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const userSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: {} })
      .required()
      .min(4)
      .lowercase()
      .label("E-Mail"),
    pass: Joi.string().required().label("Password"),
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const result = userSchema.validate({ email: email, pass: password });

    if (result.error) {
      setValidationError(result.error);
    } else {
      setValidationError("");
      props.login(email, password);
    }
  };

  return (
    <div>
      <div className="main font-semibold w-full text-textcolor ">
        <div className="container flex justify-end">
          <div className="login-content bg-backgroundColor">
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
                  className="form-input "
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
              <div className="message">
                {validationError.message || props.error_message}
              </div>
              <button className="submit-form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
              <span className="existing">
                <span className="text-white">Not a member ?</span>
                <Link to="/signup" className="text-blue ml-5">Sign Up</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    error_message: state.user.error_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear_message: () => {
      dispatch({
        type: "CLEAR_ERROR_MESSAGE",
      });
    },
    login: (email, password) => {
      dispatch(actions.userLogin(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
