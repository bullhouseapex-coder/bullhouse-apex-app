import { Router } from "express";
import { checkAuth, googleLogin, login, logout, signup } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.get("/check", protectedRoute, checkAuth);

router.post("/google-login", googleLogin);

router.post("/logout", logout);

router.post("/signup", signup);

export default router;
