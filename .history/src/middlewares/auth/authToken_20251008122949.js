// middleware/authToken.js
import jwt from "jsonwebtoken";
import Employee from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";
import { SuperAdminCollection } from "../../controllers/auth/auth.js";

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
    if ((await Employee.countDocuments()) === 0) {
      req.user = await SuperAdminCollection.findOne({ email });
    } else {
      // Attach user to request (excluding password)
      req.user = await Employee.findOne(decoded.email);
    }

    if (!req.user) {
      const userNotFoundObject = {
        status: 401,
        message: "User has not registered",
      };
      sendResponse(res, userNotFoundObject);
    }

    next();
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    sendResponse(res, serverErrorObject);
  }
};

export default authToken;
