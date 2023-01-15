const { ObjectId, default: mongoose } = require("mongoose");
const postModel = require("../../db/models/post.model");
const { resHandler } = require("../helpers/helper");

class Post {
  static addPost = async (req, res) => {
    try {
      const postData = new postModel({
        userId: req.user._id,
        ...req.body,
      });
      await postData.save();
      resHandler(res, 200, true, postData, "Post Added Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static getMyPosts = async (req, res) => {
    try {
      // const posts = await postModel.find({userId: req.user._id})
      await req.user.populate("myPosts");
      resHandler(
        res,
        200,
        true,
        {
          posts: req.user.myPosts,
          user: req.user,
        },
        "My Posts"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static getAllPosts = async (req, res) => {
    try {
      let posts = await postModel.find();
      posts = posts.map((post) => {
        const isMine = post.userId.toString() == req.user._id.toString();

        return { ...post._doc, isMine };
      });
      console.log(posts);
      resHandler(res, 200, true, posts, "All Posts");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static getPost = async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);
      if (!post) throw new Error("Post not found");

      resHandler(res, 200, true, post, "My Post");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static updatePost = async (req, res) => {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      resHandler(
        res,
        200,
        true,
        { post: updatedPost, updatedData: req.body },
        "Post Updated"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static deletePost = async (req, res) => {
    try {
      const post = await postModel.findByIdAndRemove(req.params.id);
      console.log(post);
      if (!post) throw new Error("Post not found");
      resHandler(res, 200, true, post, "Your Post has been deleted");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static deleteAllPosts = async (req, res) => {
    try {
      await postModel.deleteMany({ userId: req.user._id });
      resHandler(
        res,
        200,
        true,
        { userId: req.user._id },
        "Your Posts have been deleted"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
}

module.exports = Post;
