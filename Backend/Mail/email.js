import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemp.js";
import { transporter } from "./email.config.js";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE({
      verificationCode: verificationToken,
      companyName: "Social Talk",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: htmlContent,
    });
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const htmlContent = WELCOME_EMAIL_TEMPLATE({
      userName: name,
      companyName: "SocialTalk App",
      unsubscribeURL: `${process.env.CLIENT_URL}/unsubscribe`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Social Talk App 🎉",
      html: htmlContent,
    });
  } catch (error) {
    console.error(" Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, url) => {
  try {
    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE({
      resetURL:url,
      companyName: "Social Talk",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password 🔐",
      html: htmlContent,
    });

  } catch (error) {
    console.error(" Error sending reset password email", error);
    throw new Error(`Error sending reset password  email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE({
      companyName: "Social Talk"
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: email,
      subject: "✅ Your password was successfully reset", 
      html: htmlContent
    });

  } catch (error) {
    throw new Error("Failed to send password reset success email");
  }
};
