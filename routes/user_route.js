const router = require("express").Router();
const {
  getAllsUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user_controller");

router.get("/users", getAllsUser);
router.get("/user/:id", getOneUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);


module.exports = router;
