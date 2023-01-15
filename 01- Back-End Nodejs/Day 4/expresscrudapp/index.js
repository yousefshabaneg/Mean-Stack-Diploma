require("dotenv").config();
const app = require("./src/app");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
