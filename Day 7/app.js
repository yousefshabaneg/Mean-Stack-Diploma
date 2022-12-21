const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/odc3");

mongoose.set("strictQuery", false);
const User = mongoose.model("User", {
  name: { type: String },
  age: { type: Number },
  email: { type: String },
});

const myUser = new User({
  name: "YOusef Shaban",
  age: 24,
  email: "Yousef@gmail.com",
});

// myUser
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const getUSer = async () => {
  return await myUser.save();
};

getUSer().then((res) => {
  console.log(res);
});
