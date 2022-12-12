const userModel = require("../../db/models/user.model");

class User {
  static test = (req, res) => {
    res.status(200).send({ Test: "Success" });
  };
}

module.exports = User;
