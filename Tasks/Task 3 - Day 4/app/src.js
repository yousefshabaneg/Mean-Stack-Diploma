//Requires.
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const myRoutes = require("./routes/app.routes");

//Variables.
const app = express();
const staticFiles = path.join(__dirname, "../frontend/static");
const viewsFiles = path.join(__dirname, "../frontend/views");
const layoutFiles = path.join(__dirname, "../frontend/layouts");

//Logic.
app.use(express.static(staticFiles));
app.set("view engine", "hbs");
app.set("views", viewsFiles);
hbs.registerPartials(layoutFiles);
app.use(myRoutes);

module.exports = app;
