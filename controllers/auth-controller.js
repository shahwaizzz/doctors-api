const { NotFoundError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthenticatedError("Email does not exist");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Your password does not match");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.firstname }, token });
};

module.exports = { login };
