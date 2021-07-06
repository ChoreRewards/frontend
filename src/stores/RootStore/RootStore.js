import { makeAutoObservable } from "mobx";
import React from "react";

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
const RootStoreContext = React.createContext(rootStore);
export default RootStoreContext;
