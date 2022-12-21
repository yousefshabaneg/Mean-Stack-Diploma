const router = require("express").Router();
const appController = require("../controllers/app.controller");
const userController = require("../controllers/user.controller");
router.get("/", appController.home);
router.get("/about", appController.about);
router.get("/add", appController.add);
router.get("/edit", appController.edit);
router.get("/showAll", appController.showAll);
router.get("/showSingle", appController.showSingle);

module.exports = router;
