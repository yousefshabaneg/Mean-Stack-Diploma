const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.allTasks);

router.get("/addTask", taskController.addTask);
router.post("/addTask", taskController.addTaskLogic);

router.get("/editTask/:id", taskController.editTask);
router.post("/editTask/:id", taskController.editTaskLogic);

router.get("/showTask/:id", taskController.showTask);

router.get("/deleteTask/:id", taskController.deleteTask);

router.get("/changeStatus/:id", taskController.changeStatus);

module.exports = router;
