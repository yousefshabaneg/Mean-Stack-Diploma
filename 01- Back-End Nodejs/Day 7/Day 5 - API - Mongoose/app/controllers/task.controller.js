const taskModel = require("../db/model/task.model");
const dataHelper = require("../helpers/data.helper");

class Task {
  static allTasks = async (req, res) => {
    try {
      const tasks = await taskModel.find();
      return this.sendSuccessTask(res, tasks);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static addTask = async (req, res) => {
    try {
      const task = new taskModel(req.body);
      await task.save();
      return this.sendSuccessTask(res, task);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static getTask = async (req, res) => {
    try {
      const id = req.params.id;
      const task = await taskModel.findById(id);
      return this.sendSuccessTask(res, task);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static editTask = async (req, res) => {
    req.body.status = req.body.status == "on";
    try {
      const _id = req.params.id;
      await taskModel.findByIdAndUpdate(_id, req.body, {
        runValidators: true,
      });
      const task = await taskModel.findById(_id);
      return this.sendSuccessTask(res, task);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static deleteTask = async (req, res) => {
    try {
      const _id = req.params.id;
      const task = await taskModel.findByIdAndRemove(_id);
      return this.sendSuccessTask(res, task);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static changeStatus = async (req, res) => {
    try {
      const _id = req.params.id;
      const task = await taskModel.findById(_id);
      task.status = !task.status;
      await task.save();
      return this.sendSuccessTask(res, task);
    } catch (err) {
      return this.sendError(res, err);
    }
  };

  static sendSuccessTask(res, task) {
    return res.status(200).send({
      status: true,
      data: task,
    });
  }

  static sendError(res, err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      error: err,
    });
  }
}

module.exports = Task;
