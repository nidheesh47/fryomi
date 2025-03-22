const express = require("express");
const {
  signup,
  login,
  getProfile,
  resetPassword,
  logout,
  profileUpdate,
  checkUser,
  deleteUserAccount,
  getUsers,
} = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);
router.put("/rest-password", authMiddleware, resetPassword);

router.post("/logout", logout);
router.put("/update-Profile", authMiddleware, profileUpdate);
router.delete("/delete-account", authMiddleware, deleteUserAccount);

router.get("/check-user", authMiddleware, checkUser);

router.get("/get-users", getUsers);
module.exports = router;
