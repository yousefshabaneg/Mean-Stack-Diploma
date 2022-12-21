const dealHelper = require("../helper/dealWithJson.helper");
const dataHelper = require("../helper/data.helper");
const { ObjectId } = require("mongodb");
const connection = require("../../db/mongo");

class Task {
  static allTasks = (req, res) => {
    connection((db) => {
      db.collection("tasks")
        .find()
        .toArray((err, tasks) => {
          if (err) return res.render("err404", { err: err.message });
          res.render("allTasks", {
            pageTitle: "All Tasks",
            tasks,
            hasTasks: tasks.length,
          });
        });
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

    connection((db) => {
      db.collection("tasks").insertOne(task);
      res.redirect("/");
    });
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

    connection((db) => {
      db.collection("tasks").insertOne(task);
      res.redirect("/");
    });
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

    connection((db) => {
      db.collection("tasks")
        .insertOne(task)
        .then((err, result) => {
          console.log(result);
          res.redirect("/");
        });
    });
  };

  static showTask = (req, res) => {
    try {
      const _id = new ObjectId(req.params.id);
      connection((db) => {
        db.collection("tasks")
          .findOne({ _id: _id })
          .then((task) => {
            res.render("showTask", { pageTitle: "Show Task", task });
          })
          .catch((err) => this.renderError(err));
      });
    } catch (err) {
      this.renderError(err);
    }
  };

  static editTask = (req, res) => {
    const _id = new ObjectId(req.params.id);
    connection((db) => {
      db.collection("tasks")
        .findOne({ _id: _id })
        .then((task) => {
          res.render("editTask", { pageTitle: "Edit Task", task });
        })
        .catch((err) => this.renderError(err));
    });
  };

  static editTaskLogic = (req, res) => {
    const _id = new ObjectId(req.params.id);
    const newData = req.body;
    newData.status = newData.status == "on";

    connection((db) => {
      db.collection("tasks")
        .updateOne(
          {
            _id: _id,
          },
          {
            $set: newData,
          }
        )
        .then((task) => {
          res.redirect(`/showTask/${_id}`);
        })
        .catch((err) => this.renderError(err));
    });
  };

  static deleteTask = (req, res) => {
    const id = new ObjectId(req.params.id);
    connection((db) => {
      db.collection("tasks")
        .deleteOne({ _id: id })
        .then((result) => {
          res.redirect("/");
        });
    });
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

  static getTaskIndex(id) {
    return dealHelper.readFromJson().findIndex((t) => t.id == id);
  }
}

module.exports = Task;
