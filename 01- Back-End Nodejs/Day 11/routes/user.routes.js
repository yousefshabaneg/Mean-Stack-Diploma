const router = require("express").Router();
const User = require("../app/controllers/user.controller");
const { auth } = require("../app/middleware/auth.middleware");
const upload = require("../app/middleware/multer.middleware");

router.get("/", User.getAllUsers);
router.get("/getAllUsers", auth, User.getAllUsers);
router.get("/profile", auth, User.profile);
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/profile", auth, User.profile);

router.get("/getUser/:id", auth, User.getUser);

//Logout
router.post("/logout", auth, User.logout);

//Logout All Devices
router.post("/logoutAll", auth, User.logoutAll);

//activate-deactivate status
router.post("/activateStatus", auth, User.activateStatus);

//edit my profile
//edit other users
//delete me
//delete user

//add address
router.post("/addAddress", auth, User.addAddress);

//delete address
router.delete("/deleteAddress/:id", auth, User.deleteAddress);

//show all addresses
router.get("/showAllAddresses", auth, User.showAllAddresses);

//show single address
router.get("/showSingleAddress/:id", auth, User.showSingleAddress);

//Update user image
router.put(
  "/updateUserImage",
  auth,
  upload.single("userImg"),
  User.updateUserImage
);

module.exports = router;
