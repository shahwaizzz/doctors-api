const express = require("express");
const router = express.Router();
const { addBenefits } = require("../controllers/user-controller");

router.patch("/procedure/:id", addBenefits);

module.exports = router;
