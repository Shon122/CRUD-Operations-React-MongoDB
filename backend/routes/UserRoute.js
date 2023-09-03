const { Router } = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/UserControllers");

const router = Router();

router.get("/get", getUsers);
router.post("/save", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;
