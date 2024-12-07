const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify", authMiddleware, (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: user,
  });
});

module.exports = router;
