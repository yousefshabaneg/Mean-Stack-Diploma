const router = require("express").Router();
const Post = require("../app/controllers/post.controller");
const { auth } = require("../app/middleware/auth.middleware");

router.post("/addPost", auth, Post.addPost);
router.get("/getMyPosts", auth, Post.getMyPosts);
router.get("/getAllPosts", auth, Post.getAllPosts);
router.get("/getPost/:id", auth, Post.getPost);
router.put("/updatePost/:id", auth, Post.updatePost);
router.delete("/deletePost/:id", auth, Post.deletePost);
router.delete("/deleteAllPosts", auth, Post.deleteAllPosts);

module.exports = router;
