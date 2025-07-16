import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import {signup, verifyEmail, login, forgcodeassword, logout, resetPassword, updateProfile, onboard, resendVerificationCode} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);

router.post("/verify-email", protectRoute,verifyEmail);
router.post("/resend-code", protectRoute, resendVerificationCode);

router.post("/forgot-password",forgcodeassword);
router.post("/reset-password/:token",resetPassword);

router.post('/onboarding',protectRoute, onboard);
router.put("/update-profile",protectRoute, updateProfile);

router.get("/me",protectRoute,(req,res)=>{
    return res.status(200).json({success:true, user: req.user})
})

export default router;