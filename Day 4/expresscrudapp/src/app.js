const express = require("express");
const path = require("path");
const hbs = require("hbs");
var Handlebars = require("handlebars");

const userRoutes = require("../routes/user.routes");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../views");
const layoutDir = path.join(__dirname, "../layout");

const app = express();

app.use(express.static(publicDir));
app.set("view engine", "hbs");
app.set("views", viewsDir);

// Handlebars.registerHelper("copyrightYear", function () {
//   var year = new Date().getFullYear();

//   return new Handlebars.SafeString(year);
// });

hbs.registerPartials(layoutDir);

hbs.registerHelper("copyright", function () {
  var year = new Date().getFullYear();

  return new Handlebars.SafeString(`Copyright By Yousef Shaban - ${year}`);
});

app.use(userRoutes);
module.exports = app;

app.render;

// Notes:
//frontend
//    layout -----> header.hbs
//    views ------> home.hbs
//    static --> css ---> style.css --> "./ get static folder"
// * call it with app.use(express.static(staticDir))
