import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";

import "./Login.scss";
import { AuthStoreContext } from "../../stores";

const Login = withRouter(
  observer((props) => {
    const { loginState, resetLoginError, login } = useContext(AuthStoreContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clearErrors = () => {
      if (loginState.error) {
        resetLoginError();
      }
    };

    const handleUsernameChange = (e) => {
      clearErrors();
      setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      clearErrors();
      setPassword(e.target.value);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      login({ username, password });
    };

    const { from } = props.location.state || {
      from: { pathname: "/" },
    };

    const redirectToReferrer = loginState.isAuthenticated;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login container">
        <div className="row">
          <div className="col">
            <input
              id="username-input"
              type="text"
              name="username"
              placeholder="username"
              className="form-control form-control-lg"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin(e);
                }
              }}
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            <input
              id="password-input"
              type="password"
              name="password"
              placeholder="password"
              className="form-control form-control-lg"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin(e);
                }
              }}
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            <input
              className="btn btn-success btn-block mb-2"
              type="submit"
              onClick={handleLogin}
              value="Login"
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            {loginState.error && (
              <div className="alert alert-danger" role="alert">
                {loginState.error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })
);

export default Login;
