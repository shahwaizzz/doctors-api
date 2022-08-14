const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Procedure Name"],
  },
  benefits: [
    {
      code: String,
      name: String,
      detail: String,
      statistics: String,
    },
  ],
  risks: [
    {
      code: String,
      name: String,
      detail: String,
      statistics: String,
    },
  ],
  additionalBenefits: [
    {
      code: String,
      name: String,
      detail: String,
      statistics: String,
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
  ],
  additionalRisks: [
    {
      code: String,
      name: String,
      detail: String,
      statistics: String,
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
  ],
});

module.exports = mongoose.model("Procedure", procedureSchema);
