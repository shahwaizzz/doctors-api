const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUsers,
  updateUser,
} = require("../controllers/admin-controller");

router.route("/users").post(createUser).get(getUsers);
router
  .route("/users/:id")
  .patch(updateUser)
  .delete(deleteUsers)
  .get(getSingleUser);

module.exports = router;
