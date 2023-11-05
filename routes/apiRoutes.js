const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/controllers");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUsersById)
router.route("/createuser").post(createUser);
router.route("/updateuser/:id").put(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);

module.exports = router;
