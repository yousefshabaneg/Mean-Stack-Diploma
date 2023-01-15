const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.allTasks);

//GET
router.get("/addTask", taskController.addTask);
router.get("/addTaskGet", taskController.addMyLogic);

//POST
router.get("/addTaskPost", taskController.addTaskPost);
router.post("/addTaskPost", taskController.addMyLogic);

router.get("/editTask/:id", taskController.editTask);
router.post("/editTask/:id", taskController.editTaskLogic);

router.get("/showTask/:id", taskController.showTask);

router.get("/deleteTask/:id", taskController.deleteTask);

router.get("/changeStatus/:id", taskController.changeStatus);

module.exports = router;
