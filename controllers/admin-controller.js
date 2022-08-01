const User = require("../models/user-model");
const Procedure = require("../models/procedure-model");
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
  res.status(StatusCodes.OK).json({ msg: "User Updated" });
};

const createProcedure = async (req, res) => {
  const procedure = await Procedure.create({
    ...req.body,
  });
  res.status(StatusCodes.OK).json({ msg: "Procedure created" });
};
const getProcedure = async (req, res) => {
  const procedures = await Procedure.find({});
  if (procedures.length === 0) {
    throw new NotFoundError("No Procedures yet");
  }
  res.status(StatusCodes.OK).json({ procedures });
};
const getSingleProcedure = async (req, res) => {
  const procedure = await Procedure.findOne({ _id: req.params.id });
  if (!procedure) {
    throw new NotFoundError("This procedure does not exist");
  }
  res.status(StatusCodes.OK).json({ procedure });
};
const updateProcedure = async (req, res) => {
  const updatedProcedure = await Procedure.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "User Updated" });
};
const deleteProcedure = async (req, res) => {
  const procedure = await Procedure.findByIdAndDelete({ _id: req.params.id });
  if (!procedure) {
    throw new NotFoundError("Procedure does not exist already");
  }
  res.status(StatusCodes.OK).json({ msg: "Procedure Deleted" });
};

module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  deleteUsers,
  updateUser,
  createProcedure,
  getProcedure,
  getSingleProcedure,
  deleteProcedure,
  updateProcedure,
};
