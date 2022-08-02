const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUsers,
  updateUser,
  createProcedure,
  getProcedure,
  getSingleProcedure,
  getProcedureByName,
  updateProcedure,
  deleteProcedure,
} = require("../controllers/admin-controller");

router.route("/users").post(createUser).get(getUsers);
router
  .route("/users/:id")
  .patch(updateUser)
  .delete(deleteUsers)
  .get(getSingleUser);
router.route("/procedures").post(createProcedure).get(getProcedure);
router.route("/search").get(getProcedureByName);
router
  .route("/procedures/:id")
  .get(getSingleProcedure)
  .patch(updateProcedure)
  .delete(deleteProcedure);
module.exports = router;
