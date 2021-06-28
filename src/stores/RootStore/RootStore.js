import { makeAutoObservable } from "mobx";

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
