import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  forgotPasswordController,
  getProfileController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controllers/authController.js";

export const authRouter = express.Router();
authRouter.post(
  "/register",
  upload.single("profile_image"),
  registerController
);
authRouter.post("/login", loginController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password/:token", resetPasswordController);
authRouter.get("/dashboard", authMiddleware, getProfileController);
