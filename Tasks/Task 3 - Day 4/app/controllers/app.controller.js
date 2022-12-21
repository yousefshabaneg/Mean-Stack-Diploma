class App {
  static home = (req, res) => {
    res.render("home", {
      name: "Yousef Shaban",
      pageTitle: "Home Page",
    });
  };

  static about = (req, res) => {
    res.render("about", {
      pageTitle: "About Page",
    });
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add New User",
    });
  };

  static edit = (req, res) => {
    res.render("edit", {
      pageTitle: "Edit User",
    });
  };

  static showAll = (req, res) => {
    res.render("showAll", {
      pageTitle: "Show All Users",
    });
  };

  static showSingle = (req, res) => {
    res.render("showSingle", {
      pageTitle: "Show User",
    });
  };
}
module.exports = App;
