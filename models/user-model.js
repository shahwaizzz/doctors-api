const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Provide First Name"],
  },
  lastname: {
    type: String,
    required: [true, "Please Provide Last Name"],
  },
  qualifications: {
    type: String,
    required: [true, "Please Provide Qualifications"],
  },
  practicename: {
    type: String,
    required: [true, "Please Provide Practice Name"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
});
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstname },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  );
};

module.exports = mongoose.model("Users", userSchema);
