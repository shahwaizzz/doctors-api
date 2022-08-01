const mongoose = require("mongoose");
const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Procedure Name"],
  },
  benefits: [
    {
      _id: mongoose.Types.ObjectId,
      name: String,
      detail: String,
      statistics: String,
    },
  ],
  risks: [
    {
      _id: mongoose.Types.ObjectId,
      name: String,
      detail: String,
      statistics: String,
    },
  ],
});

module.exports = mongoose.model("Procedure", procedureSchema);
