import { action, makeObservable, observable } from "mobx";
import { apiFetchData } from "../common/api-fetch";
import { toast } from "react-toastify";

const task = {
  taskID: 0,
  description: "",
  status: false,
};

const search = {
  desc: "",
  status: null,
};

class TaskStore {
  newTask = { taskID: 0, description: "", status: false };
  tasks = [];
  search = { ...search };
  currentPage = 0;

  constructor() {
    //makeAutoObservable(this);
    makeObservable(this, {
      newTask: observable,
      tasks: observable,
      currentPage: observable,
      search: observable,
      changeNewTask: action,
      addTask: action,
      setTasks: action,
      updateTaskStatus: action,
      getAllTasks: action,
      searchTasks: action,
      changeSearch: action,
      resetSearch: action,
    });

    this.searchTasks = this.searchTasks.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.changeNewTask = this.changeNewTask.bind(this);
    this.setTasks = this.setTasks.bind(this);
  }

  getAllTasks() {
    apiFetchData("api/tasks", "GET").then((data) => {
      this.setTasks(data);
    });
  }

  searchTasks() {
    apiFetchData(
      `api/tasks/search?desc=${this.search.desc.replace(/\s/g, "+")}&status=${
        this.search.status
      }`,
      "GET"
    ).then((res) => {
      this.tasks = res;
    });
  }

  changeSearch(data) {
    debugger;
    let value = data.checked ? data.checked : data.value;
    this.search[data.id] = value;
  }

  resetSearch() {
    this.search = { ...search };
  }

  changeNewTask(data) {
    let value = data.checked ? data.checked : data.value;
    this.newTask[data.id] = value;
  }

  setTasks(tasks) {
    this.tasks = [...tasks];
  }

  addTask() {
    if (!this.newTask.description) {
      alert("Cannot add empty task!");
      return;
    }

    //1. call save task API
    apiFetchData("api/tasks/", "POST", this.newTask).then(() => {
      this.newTask = { ...task };
      toast.success("Task added.");
    });
  }

  async updateTaskStatus(task) {
    task.status = !task.status;
    let newTask = { ...task };
    await apiFetchData("api/tasks/update", "POST", newTask);
  }
}

export default TaskStore;
