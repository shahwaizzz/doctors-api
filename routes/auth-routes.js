const express = require("express");
const router = express.Router();
const { login, adminLogin } = require("../controllers/auth-controller");
router.route("/user/login").post(login);
router.route("/admin/login").post(adminLogin);

module.exports = router;
