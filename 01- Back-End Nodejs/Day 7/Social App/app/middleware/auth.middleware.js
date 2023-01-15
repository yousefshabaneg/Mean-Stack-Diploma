const userModel = require("../../db/models/user.model");
const { resHandler } = require("../helpers/helper");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await userModel.verifyToken(token);
    resHandler(res, 200, true, user, "Authorizion Successfully");
  } catch (err) {
    resHandler(res, 404, false, err.message, "Unauthorized");
  }
};

module.exports = { auth };
