const Procedure = require("../models/procedure-model");
const { StatusCodes } = require("http-status-codes");
const addBenefits = async (req, res) => {
  const newProcedure = await Procedure.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { additionalBenefits: req.body.benefit } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Benefit Added" });
};

module.exports = {
  addBenefits,
};
