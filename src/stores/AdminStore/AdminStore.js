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
    categories: [],

    userError: null,
    categoryError: null,
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

    this.adminState.userError = null;

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
        runInAction(() => {
          this.adminState.userError = err?.response?.data?.message;
        });
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

  listCategories = (token) => {
    if (!token) {
      console.log("No token provided");
      return;
    }

    const url = config.server.baseURL + "/categories";

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
          this.adminState.categories = res.data.categories;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  createCategory = ({ token, name, color, description }) => {
    if (!token) {
      console.log("No token provided");
      return;
    }

    this.adminState.categoryError = null;

    const url = config.server.baseURL + "/categories";

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url,
      data: { name, color, description },
    })
      .then((res) => {
        runInAction(() => {
          this.adminState.categories.push(res?.data?.category);
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.adminState.categoryError = err?.response?.data?.message;
        });
      });
  };
}

const adminStore = new AdminStore();
const AdminStoreContext = React.createContext(adminStore);
export default AdminStoreContext;
