require("../db/connect");
const express = require("express");
const userRoutes = require("../routes/user.routes");
const postRoutes = require("../routes/post.routes");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../uploads")));

app.use("/api/user/", userRoutes);
app.use("/api/post/", postRoutes);

app.all("*", (_, res) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
  });
});

module.exports = app;
