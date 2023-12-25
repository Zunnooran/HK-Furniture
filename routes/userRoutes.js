import express from "express";
const router = express.Router();
import UserController from "../controllers/user/userControllerRegister.js";
import { userLogin } from "../controllers/user/userControllerLogin.js";
import { getProfile } from "../controllers/user/userControllerGetProfile.js";
import { changePassword } from "../controllers/user/userControllerChangePassword.js";
import ResetPassword from "../controllers/user/userControllerResetPassword.js";
import { googleLogin } from "../controllers/social/socialControllerGoogleLogin.js";
import { registerAccountByGoogle } from "../controllers/social/socialControllerGoogleRegister.js";
import isAuthenticated from "../middlewares/auth-middleware.js";

// Route Level Middleware - To Protect Route
router.use("/change-password", isAuthenticated);
router.use("/get-profile", isAuthenticated);

//PUBLIC ROUTES
router.post("/register", UserController.userRegistration);
router.post("/login", userLogin);
router.post("/send-reset-password-email", ResetPassword.sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", ResetPassword.passwordReset)
router.post("/login-google", googleLogin);
router.post("/register-google", registerAccountByGoogle);

//PROTECTED ROUTES
router.post("/change-password", changePassword);
router.get("/get-profile", getProfile);

export default router;
