const dealHelper = require("../helper/dealWithJson.helper");
const dataHelper = require("../helper/data.helper");

class Task {
  static allTasks = (req, res) => {
    const tasks = dealHelper.readFromJson();
    res.render("allTasks", {
      pageTitle: "All Tasks",
      tasks,
      hasTasks: tasks.length,
    });
  };

  //Add - GET
  static addTask = (req, res) => {
    res.render("addTask", { pageTitle: "Add New Task" });
    // res.send(req.query);
  };

  static addTaskGetLogic = (req, res) => {
    const task = {
      id: Date.now(),
      status: false,
      ...req.query,
    };

    const all = dealHelper.readFromJson();
    all.push(task);
    dealHelper.writeToJson(all);
    res.redirect("/");
    // res.send(req.query);
  };

  //Add - Post
  static addTaskPost = (req, res) => {
    res.render("addTaskPost", { pageTitle: "Add New Task" });
    // res.send(req.query);
  };

  static addTaskPostLogic = (req, res) => {
    const task = {
      id: Date.now(),
      status: false,
      ...req.body,
    };

    const all = dealHelper.readFromJson();
    all.push(task);
    dealHelper.writeToJson(all);
    res.redirect("/");
    // res.send(req.query);
  };

  static addMyLogic = (req, res) => {
    let data;
    if (req.method == "POST") data = req.body;
    else data = req.query;

    const task = {
      id: Date.now(),
      status: false,
      ...data,
    };

    const all = dealHelper.readFromJson();
    all.push(task);
    dealHelper.writeToJson(all);
    res.redirect("/");
  };

  static showTask = (req, res) => {
    const id = req.params.id;
    const data = this.getTaskById(id);

    if (!data) {
      return this.renderError(res);
    }
    res.render("showTask", { pageTitle: "Show Task", data });
  };

  static editTask = (req, res) => {
    const id = req.params.id;
    const data = this.getTaskById(id);
    if (!data) {
      return this.renderError(res);
    }
    res.render("editTask", { pageTitle: "Edit Task", data });
  };

  static editTaskLogic = (req, res) => {
    const id = req.params.id;
    const index = this.getTaskIndex(id);

    const all = dealHelper.readFromJson();
    const task = all[index];

    const newTask = { id: task.id, ...req.body };

    newTask.status = newTask.status == "on";

    all[index] = newTask;
    dealHelper.writeToJson(all);
    res.redirect(`/showTask/${newTask.id}`);
  };

  static deleteTask = (req, res) => {
    const id = req.params.id;
    const all = dealHelper.readFromJson();
    const newData = all.filter((t) => t.id != id);
    dealHelper.writeToJson(newData);
    res.redirect("/");
  };

  static changeStatus = (req, res) => {
    const id = req.params.id;
    const index = this.getTaskIndex(id);

    if (index == -1) {
      return this.renderError(res);
    }

    const all = dealHelper.readFromJson();

    all[index].status = !all[index].status;

    dealHelper.writeToJson(all);
    res.redirect("/");
  };

  static renderError(res, message = "Task Not Found") {
    return res.render("err404", {
      pageTitle: `Error 404, ${message}`,
      err: message,
    });
  }

  static getTaskById(id) {
    return dealHelper.readFromJson().find((t) => t.id == id);
  }

  static getTaskIndex(id) {
    return dealHelper.readFromJson().findIndex((t) => t.id == id);
  }
}

module.exports = Task;
