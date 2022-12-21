require("./db/connect");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const taskRoutes = require("../app/routes/task.routes");

//Variables.
const app = express();
const staticFiles = path.join(__dirname, "../clientSide/public");
const viewsFiles = path.join(__dirname, "../clientSide/views");
const layoutFiles = path.join(__dirname, "../clientSide/layouts");

app.use(express.static(staticFiles));
app.set("view engine", "hbs");
app.set("views", viewsFiles);
hbs.registerPartials(layoutFiles);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(taskRoutes);
// app.use("/task", taskRoutes);

app.all("*", (req, res) =>
  res.render("err404", {
    pageTitle: "Page Not Found",
    err: "Error 404, Page not found",
  })
);

module.exports = app;
