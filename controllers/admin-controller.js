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
const deleteBenefit = async (req, res) => {
  const updatedprocedure = await Procedure.findOneAndUpdate(
    {
      "benefits._id": req.params.id,
    },
    {
      $pull: {
        benefits: {
          _id: req.params.id,
        },
      },
    },
    false
  );
  res.send("benefit deleted");
};
const deleteRisk = async (req, res) => {
  const updatedprocedure = await Procedure.findOneAndUpdate(
    {
      "risks._id": req.params.id,
    },
    {
      $pull: {
        risks: {
          _id: req.params.id,
        },
      },
    },
    false
  );
  res.send("Risk deleted");
};

const getSingleProcedure = async (req, res) => {
  const procedure = await Procedure.findOne({ _id: req.params.id });
  if (!procedure) {
    throw new NotFoundError("This procedure does not exist");
  }
  res.status(StatusCodes.OK).json({ procedure });
};
const getProcedureByName = async (req, res) => {
  const searchquery = req.query.query;
  const procedure = await Procedure.findOne({
    name: { $regex: searchquery, $options: "$i" },
  });
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
const approveBenefit = async (req, res) => {
  const { code } = req.body;
  const procedure = await Procedure.findOneAndUpdate(
    { "additionalBenefits._id": req.params.id },
    {
      $set: {
        "additionalBenefits.$.status": "Approved",
        "additionalBenefits.$.code": code,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // const approvedBenefit = procedure.benefits.filter((benefit))
  const approvedBenefit = await Procedure.findOne({
    _id: procedure._id,
  }).select({
    additionalBenefits: { $elemMatch: { _id: req.params.id } },
  });
  const variable = approvedBenefit.additionalBenefits[0];
  const newProcedure = await Procedure.findOneAndUpdate(
    { _id: procedure._id },
    { $push: { benefits: variable } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Benefit Approved, OK" });
};
const rejectBenefit = async (req, res) => {
  const procedure = await Procedure.findOneAndUpdate(
    { "additionalBenefits._id": req.params.id },
    {
      $set: { "additionalBenefits.$.status": "Rejected" },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "Benefit Rejected" });
};
const approveRisk = async (req, res) => {
  const { code } = req.body;
  const procedure = await Procedure.findOneAndUpdate(
    { "additionalRisks._id": req.params.id },
    {
      $set: {
        "additionalRisks.$.status": "Approved",
        "additionalBenefits.$.code": code,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const approvedRisk = await Procedure.findOne({
    _id: procedure._id,
  }).select({
    additionalRisks: { $elemMatch: { _id: req.params.id } },
  });
  const variable = approvedRisk.additionalRisks[0];
  const newProcedure = await Procedure.findOneAndUpdate(
    { _id: procedure._id },
    { $push: { risks: variable } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Risk Approved" });
};
const rejectRisk = async (req, res) => {
  const procedure = await Procedure.findOneAndUpdate(
    { "additionalRisks._id": req.params.id },
    {
      $set: { "additionalRisks.$.status": "Rejected" },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "Risk Rejected" });
};

module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  deleteUsers,
  updateUser,
  createProcedure,
  getProcedure,
  deleteBenefit,
  deleteRisk,
  getSingleProcedure,
  getProcedureByName,
  deleteProcedure,
  updateProcedure,
  approveBenefit,
  rejectBenefit,
  approveRisk,
  rejectRisk,
};
