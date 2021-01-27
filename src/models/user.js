const mongoose = require("mongoose");
const { Schema } = mongoose;
import { sign } from "./../utils/jwt";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      alias: "id",
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    username: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String
    },
    fullName: String,
    image: String,
    phone: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("id").get(function () {
  return this._id;
});

//TODO : not working
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = "sdf";
    // encryptPassword()
    this.hashPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: (password) => {
    if (!password) return "";
    try {
      sign(password);
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("users", userSchema);
