import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided-t" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided-d" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not foound" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
