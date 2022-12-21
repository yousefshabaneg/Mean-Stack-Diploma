const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20,
      required: true,
    },
    lName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20,
      required: true,
    },
    age: {
      type: Number,
      min: 21,
      max: 60,
      default: 21,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email format");
        }
      },
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 5,
      required: true,
      // match: ''
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    dOfBirth: {
      type: Date,
    },
    phoneNum: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid number");
      },
    },
    addresses: [
      {
        addressType: {
          type: String,
          trim: true,
          required: true,
        },
        details: {},
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});

userSchema.statics.login = async (email, password) => {
  // find one user by email
  const user = await User.findOne({ email });
  if (!user) throw new Error("User doest not exist");

  // validate password
  const checkPassword = await bcryptjs.compare(password, user.password);
  if (!checkPassword) throw new Error("Invalid Password");

  //delete password
  delete user.password;
  return user;
};

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.privateKey);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.verifyToken = async function (token) {
  if (!token) throw new Error("Error: Token is required");

  const decodedToken = jwt.verify(token, process.env.privateKey);
  if (!decodedToken._id) throw new Error("Error: User doest not exist");

  const user = await User.findOne({
    _id: decodedToken._id,
    "tokens.token": token,
  });
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
