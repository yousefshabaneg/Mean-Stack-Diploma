const userModel = require("../../db/models/user.model");
const { resHandler } = require("../helpers/helper");

class User {
  static async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      resHandler(res, 200, true, users, "users fetched successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      resHandler(res, 200, true, user, "user fetched successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  }

  static register = async (req, res) => {
    try {
      const user = new userModel(req.body);
      const token = await user.generateToken();
      await user.save();
      resHandler(
        res,
        200,
        true,
        { user, token },
        "user registered successfully"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      const token = await user.generateToken();
      resHandler(
        res,
        200,
        true,
        { user, token },
        "welcome logged in successfully"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static profile = async (req, res) => {
    try {
      const token = req.body?.token;
      const user = await userModel.verifyToken(token);
      resHandler(res, 200, true, { user, token }, "Successfully verified");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
}

module.exports = User;
