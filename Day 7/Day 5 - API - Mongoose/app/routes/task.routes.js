const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.allTasks);

router.post("/addTask", taskController.addTask);

router.put("/editTask/:id", taskController.editTask);

router.get("/showTask/:id", taskController.getTask);

router.delete("/deleteTask/:id", taskController.deleteTask);

router.put("/changeStatus/:id", taskController.changeStatus);

module.exports = router;
