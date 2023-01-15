const taskModel = require("../db/model/task.model");
const dataHelper = require("../helpers/data.helper");

class Task {
  static allTasks = async (req, res) => {
    try {
      const tasks = await taskModel.find();
      res.render("allTasks", {
        pageTitle: "All Tasks",
        tasks,
        hasTasks: tasks.length,
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static addTask = (req, res) => {
    res.render("addTask", { pageTitle: "Add New Task" });
  };

  static addTaskLogic = async (req, res) => {
    try {
      const task = new taskModel(req.body);
      await task.save();
      res.redirect("/");
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static showTask = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await taskModel.findById(id);
      const task = { ...result._doc };
      task.dueDate = dataHelper.convertDateToString(task.dueDate);
      res.render("showTask", { pageTitle: "Show Task", task });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static editTask = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await taskModel.findById(id);
      const task = { ...result._doc };
      task.dueDate = dataHelper.convertDateToString(task.dueDate);
      res.render("editTask", { pageTitle: "Edit Task", task });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static editTaskLogic = async (req, res) => {
    req.body.status = req.body.status == "on";
    try {
      const _id = req.params.id;
      await taskModel.findByIdAndUpdate(_id, req.body, { runValidators: true });
      res.redirect(`/showTask/${_id}`);
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static deleteTask = async (req, res) => {
    try {
      const _id = req.params.id;
      // await taskModel.deleteOne({ _id });
      // await taskModel.findByIdAndDelete(_id);
      await taskModel.findByIdAndRemove(_id);
      res.redirect("/");
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static changeStatus = async (req, res) => {
    try {
      const _id = req.params.id;
      const task = await taskModel.findById(_id);
      task.status = !task.status;
      await task.save();
      res.redirect("/");
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static renderError(res, message = "Task Not Found") {
    return res.render("err404", {
      pageTitle: `Error 404, ${message}`,
      err: message,
    });
  }
}

module.exports = Task;
