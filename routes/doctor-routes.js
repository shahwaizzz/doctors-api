const express = require("express");
const router = express.Router();
const { addBenefits, addRisks } = require("../controllers/user-controller");

// router.patch("/procedure/:id", addBenefits);
router.route("/procedure/:id").patch(addBenefits).put(addRisks);

module.exports = router;
