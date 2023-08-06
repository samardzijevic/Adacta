import { makeAutoObservable } from "mobx";
import TaskStore from "./tasks-store";

class MobxStore {
  constructor() {
    makeAutoObservable(this);
    this.taskStore = new TaskStore();
  }
}

const mobxStore = new MobxStore();
export default mobxStore;
