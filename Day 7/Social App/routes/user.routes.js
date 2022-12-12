const router = require("express").Router();
const User = require("../app/controllers/user.controller");

router.get("/", User.test);
module.exports = router;
