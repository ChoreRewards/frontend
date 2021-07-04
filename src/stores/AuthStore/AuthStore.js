import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import config from '../../config.json';
import axios from 'axios';

class AuthStore {
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['authToken', 'isAuthenticated', 'isAdmin', 'isParent'],
      storage: window.localStorage,
    });
  }

  loginError = null;

  authToken = null;
  isAuthenticated = false;
  isAdmin = false;
  isParent = false;

  resetLoginError() {
    this.loginError = null;
  }

  login({ username, password }) {
    if (!username || !password) {
      this.loginError = 'Please provide username and password';
      return;
    }
    const url = config.server.baseURL + '/login';
    axios({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      data: { username, password },
      url,
    })
      .then((res) => {
        runInAction(() => {
          this.authToken = res.data.token;
          this.isAuthenticated = true;
          this.isAdmin = res.data.isAdmin;
          this.isParent = res.data.isParent;
        });
      })
      .catch((err) => {
        console.log(err);
        runInAction(() => {
          this.loginError = err?.response?.data?.message;
        });
      });
  }

  logout = () => {
    this.authToken = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isParent = false;
  };
}

const authStore = new AuthStore();
export default authStore;
