import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import React from "react";

import config from "../../config.json";
import axios from "axios";

class AuthStore {
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "AuthStore",
      properties: ["loginState"],
      storage: window.localStorage,
    });
  }

  loginState = {
    error: null,
    authToken: null,
    isAuthenticated: false,
    isAdmin: false,
    isParent: false,
  };

  resetLoginError = () => {
    this.loginState.error = null;
  };

  login = ({ username, password }) => {
    if (!username || !password) {
      this.loginState.error = "Please provide username and password";
      return;
    }
    const url = config.server.baseURL + "/login";
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: { username, password },
      url,
    })
      .then((res) => {
        runInAction(() => {
          this.loginState = {
            error: null,
            authToken: res.data.token,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
            isParent: res.data.isParent,
          };
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.loginState.error = err?.response?.data?.message;
        });
      });
  };

  logout = () => {
    this.loginState = {
      error: null,
      authToken: null,
      isAuthenticated: false,
      isAdmin: false,
      isParent: false,
    };
  };
}

const authStore = new AuthStore();
const AuthStoreContext = React.createContext(authStore);
export default AuthStoreContext;
