const router = require("express").Router();
const User = require("../app/controllers/user.controller");
const { auth } = require("../app/middleware/auth.middleware");

router.get("/", User.getAllUsers);
router.get("/getAllUsers", auth, User.getAllUsers);
router.get("/getUser", User.getUser);
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/profile", User.profile);

module.exports = router;
