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
});

module.exports = mongoose.model("Procedure", procedureSchema);
