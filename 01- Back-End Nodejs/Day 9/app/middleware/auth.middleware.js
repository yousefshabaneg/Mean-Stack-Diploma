const userModel = require("../../db/models/user.model");
const { resHandler } = require("../helpers/helper");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.privateKey);
    if (!decodedToken._id) throw new Error("Error: User doest not exist");
    const user = await userModel.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    resHandler(res, 404, false, err.message, "Unauthorized");
  }
};

module.exports = { auth };
