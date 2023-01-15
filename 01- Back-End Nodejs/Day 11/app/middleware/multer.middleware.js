const fs = require("fs");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const userDir = `${req.user._id}/`;

    if (!fs.existsSync("uploads/" + userDir))
      fs.mkdirSync("uploads/" + userDir);

    const ext = file.originalname.split(".").pop();

    const img =
      userDir + "profile_" + Date.now().toString().slice(7, 11) + "." + ext;
    cb(null, img);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5000 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFiles = ["image/png", "image/jpg", "image/jpeg"];

    if (allowedFiles.includes(file.mimetype)) {
      console.log("File is Allowed");
      cb(null, true);
    } else {
      console.log("File is Not Allowed");
      cb(null, false);

      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
module.exports = upload;
