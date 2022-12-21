const jwt = require("jsonwebtoken");
const token = jwt.sign({ name: "marwa" }, "odc");
console.log(token);
console.log(jwt.verify(token, "odc"));
