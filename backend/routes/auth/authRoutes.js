import express from "express";
import { registerUser, loginUser, logoutUser, authMiddleware } from "../../controllers/authController.js";

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

export default router;
