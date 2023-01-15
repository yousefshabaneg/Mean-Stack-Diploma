const userModel = require("../../db/models/user.model");
const { resHandler } = require("../helpers/helper");
const fs = require("fs");

class User {
  static async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      resHandler(res, 200, true, users, "users fetched successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  }

  static profile = async (req, res) => {
    try {
      resHandler(
        res,
        200,
        true,
        { user: req.user, token: req.token },
        "Successfully"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static getUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      resHandler(res, 200, true, user, "Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static activateStatus = async (req, res) => {
    try {
      req.user.status = req.body.status;
      await req.user.save();
      resHandler(res, 200, true, req.user, "Status had been Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

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

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      resHandler(res, 200, true, req.user, "Logged Out Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      resHandler(res, 200, true, req.user, "Logged Out From All Devices");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static addAddress = async (req, res) => {
    try {
      if (!req.user.addresses) req.user.addresses = [];
      req.user.addresses.push(req.body);
      await req.user.save();
      resHandler(
        res,
        200,
        true,
        req.user.addresses,
        "Addresses Added Successfully"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static deleteAddress = async (req, res) => {
    try {
      req.user.addresses = req.user.addresses.filter(
        (a) => a._id != req.params.id
      );
      await req.user.save();
      resHandler(
        res,
        200,
        true,
        req.user.addresses,
        "Addresses Deleted Successfully"
      );
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static showAllAddresses = async (req, res) => {
    try {
      resHandler(res, 200, true, req.user.addresses, "Addresses Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static showSingleAddress = async (req, res) => {
    try {
      const address = req.user.addresses.find((a) => a._id == req.params.id);
      resHandler(res, 200, true, address, "Address Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static updateUserImage = async (req, res) => {
    try {
      if (!req.file) throw new Error("Image is required");

      // const userDir = `uploads/${req.user._id}/`;

      // if (req.user.image) {
      //   fs.unlinkSync(req.user.image);
      // } else {
      //   const ext = req.file.originalname.split(".").pop();
      //   fs.mkdirSync(userDir);

      //   const img =
      //     userDir + "profile_" + Date.now().toString().slice(7, 11) + "." + ext;
      //   req.user.image = img;
      // }

      // fs.renameSync(req.file.path, req.user.image);

      const userDir = `${req.user._id}/`;
      if (!fs.existsSync("uploads/" + userDir))
        fs.mkdirSync("uploads/" + userDir);

      // req.user.image = userDir + req.file.path;
      res.send({
        img: req.user.image,
        path: req.file.path,
        userDir,
      });
      await req.user.save();
      resHandler(res, 200, true, req.user, "Updated Successfully");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
}

module.exports = User;
