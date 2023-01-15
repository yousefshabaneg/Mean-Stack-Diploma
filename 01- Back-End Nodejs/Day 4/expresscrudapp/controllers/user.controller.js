class User {
  static index = (req, res) =>
    res.render("home", {
      owner: {
        name: "Yousef Shaban",
        age: 23,
      },
    });
}

module.exports = User;
