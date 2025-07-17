import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../Lib/utils.js";
import User from "../models/auth.model.js";
import cloudinary from "../Lib/cloudinary.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../../Mail/email.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.legth < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = new User({
      fullName,
      email,
      password,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      await sendVerificationEmail(newUser.email, verificationToken);

      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user: {
          ...newUser._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log("error in verifyEmail ", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resendVerificationCode = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findOne(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const newToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationToken = newToken;
    user.verificationTokenExpiresAt = Date.now() + 1 * 1000 * 60 * 60;
    await user.save();

    await sendVerificationEmail(user.email, newToken);

    return res.status(200).json({ message: "Verification code resent" });
  } catch (error) {
    console.log("Error in resendVerificationCode:", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const forgcodeassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email Require" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "passoward reset link sent to your email",
    });
  } catch (error) {
    console.log("error in forgcodeassword", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password Require, Enter the new password",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expire reset token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  try {
    if (!profilePic) {
      return res.status().json({ message: "Profile Pic is requied" });
    }

    const uploadresponse = await cloudinary.uploader.upload(profilePic);

    const uploadUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadresponse.secure_url },
      { new: true }
    );

    return res.status(200).json({ uploadUser });
  } catch (error) {
    console.log("Error in UpdateProfil controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;
     
    const {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      profilePic,
    } = req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All field are required",
        missingFields: [
          !fullName && "Full Name",
          !bio && "Bio",
          !nativeLanguage && "Native Language",
          !learningLanguage && "Learning Language",
          !location && "Location",
        ].filter(Boolean),
      });
    }

    let imageUrl = "";
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      imageUrl = uploadResponse.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        profilePic: imageUrl || undefined,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ success: true, updateUser });
  } catch (error) {
    console.log("Error Onboarding controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,         
    sameSite: "None",     
  });
  return res
    .status(200)
    .json({ success: true, message: "logged out successfully" });
};
