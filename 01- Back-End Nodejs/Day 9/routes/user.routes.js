const router = require("express").Router();
const User = require("../app/controllers/user.controller");
const { auth } = require("../app/middleware/auth.middleware");

router.get("/", User.getAllUsers);
router.get("/getAllUsers", auth, User.getAllUsers);
router.get("/profile", auth, User.profile);
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/profile", auth, User.profile);

router.get("/getUser/:id", auth, User.getUser);

router.post("/logout", auth, User.logout);

//activate-deactivate status

router.post("/activateStatus", auth, User.activateStatus);

module.exports = router;
