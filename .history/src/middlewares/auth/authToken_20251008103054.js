// middleware/authToken.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(404).json({ error: "User not found" });

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authToken;
