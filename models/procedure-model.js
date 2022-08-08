const mongoose = require("mongoose");
const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Procedure Name"],
  },
  benefits: [
    {
      name: String,
      detail: String,
      statistics: String,
    },
  ],
  risks: [
    {
      name: String,
      detail: String,
      statistics: String,
    },
  ],
  additionalBenefits: [
    {
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
