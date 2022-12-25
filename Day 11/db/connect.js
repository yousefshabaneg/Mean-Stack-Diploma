const mongoose = require("mongoose");
const dbUrl = process.env.dbUrl;
try {
  mongoose.connect(dbUrl);
} catch (e) {
  return console.log(e.message);
}
