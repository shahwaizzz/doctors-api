const User = require("../models/user-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const createUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.OK).json({ msg: "User created" });
};
const getUsers = async (req, res) => {
  const users = await User.find({});
  if (users.length === 0) {
    throw new NotFoundError("No users yet");
  }
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new NotFoundError("No user found");
  }
  res.status(StatusCodes.OK).json({ user });
};
const deleteUsers = async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    throw new NotFoundError("User does not exist already");
  }
  res.status(StatusCodes.OK).json({ msg: "User Deleted" });
};
const updateUser = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  deleteUsers,
  updateUser,
};
