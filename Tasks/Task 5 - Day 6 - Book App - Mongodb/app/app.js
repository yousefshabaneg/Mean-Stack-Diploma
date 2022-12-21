//Requires
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bookRoutes = require("./routes/book.routes");

//Variables.
const app = express();
const staticFiles = path.join(__dirname, "../clientSide/static");
const viewsFiles = path.join(__dirname, "../clientSide/views");
const layoutFiles = path.join(__dirname, "../clientSide/layouts");

//Logic
app.use(express.static(staticFiles));
app.set("view engine", "hbs");
app.set("views", viewsFiles);
hbs.registerPartials(layoutFiles);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bookRoutes);

module.exports = app;
