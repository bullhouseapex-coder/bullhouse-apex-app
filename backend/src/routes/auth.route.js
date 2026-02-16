import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller.js";
import { generateToken } from "../lib/utils.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", (req, res) => {
  console.log("Login Route");

  generateToken({ userId: 123 }, res);

  return res.status(200).json({ message: "Login Route" });
});

router.get("/check", protectedRoute, (req, res) => {
  try {
    res.status(200).json(req.authUser);
  } catch (error) {
    console.error("Error in Auth Route: check:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/google-login", googleLogin);

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout" });
});

export default router;
