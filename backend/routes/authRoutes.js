import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.get("/me", protect, (req, res) => {
  res.json({
    userId: req.userId,
  });
});
export default router;
