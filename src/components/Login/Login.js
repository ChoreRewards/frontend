import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";

import "./Login.scss";
import AuthStoreContext from "../../stores/AuthStore";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  static contextType = AuthStoreContext;

  clearErrors = () => {
    if (this.context.loginState.error) {
      this.context.resetLoginError();
    }
  };

  handleUsernameChange = (e) => {
    this.clearErrors();
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.clearErrors();
    this.setState({ password: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.context.login({ username, password });
  };

  render() {
    const error = this.context.loginState.error
      ? this.context.loginState.error
      : null;

    const { from } = this.props.location.state || {
      from: { pathname: "/" },
    };

    const redirectToReferrer = this.context.loginState.isAuthenticated;

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
                  this.login(e);
                }
              }}
              onChange={this.handleUsernameChange}
              value={this.state.username}
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
                  this.login(e);
                }
              }}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            <input
              className="btn btn-success btn-block mb-2"
              type="submit"
              onClick={this.login}
              value="Login"
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(observer(Login));
