import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import config from '../../config.json';
import axios from 'axios';

class AuthStore {
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['authToken', 'isAuthenticated'],
      storage: window.localStorage,
    });
  }

  loginState = null;
  authToken = '';
  isAuthenticated = false;

  resetLoginError() {
    this.loginState.error = null;
  }

  login({ username, password }) {
    if (!username || !password) {
      this.loginState = {
        error: 'Please provide username and password',
      };
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
        });
      })
      .catch((err) => {
        console.log(err);
        runInAction(() => {
          this.loginState = {
            error: err?.response?.data?.message,
          };
        });
      });
  }

  logout() {
    this.authToken = null;
    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;
