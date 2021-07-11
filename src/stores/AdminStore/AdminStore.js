import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

import axios from "axios";

import config from "../../config.json";

class AdminStore {
  constructor() {
    makeAutoObservable(this);
  }

  adminState = {
    users: [],
  };

  createUser = ({
    token,
    username,
    password,
    email,
    avatar,
    isParent,
    isAdmin,
  }) => {
    if (!token) {
      console.log("No token provided");
      return;
    }

    const url = config.server.baseURL + "/users";

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url,
      data: { username, password, email, avatar, isParent, isAdmin },
    })
      .then((res) => {
        runInAction(() => {
          this.adminState.users.push(res?.data?.user);
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  listUsers = (token) => {
    if (!token) {
      console.log("No token provided");
      return;
    }

    const url = config.server.baseURL + "/users";

    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url,
    })
      .then((res) => {
        runInAction(() => {
          this.adminState.users = res.data.users;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };
}

const adminStore = new AdminStore();
const AdminStoreContext = React.createContext(adminStore);
export default AdminStoreContext;
