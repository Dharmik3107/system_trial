// middleware/authToken.js
import jwt from "jsonwebtoken";
import Employee from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";
import { permission } from "../../utils/permissions.js";

const createControl = async (req, res, next) => {
  const creatorRole = req.user.role;
  const newEmployeeRole = req.body.role;
  // Check header format: "Bearer <token>"

  try {
    if (!req.user) {
      const userNotFoundObject = {
        status: 401,
        message: "User has not registered",
      };
      return sendResponse(res, userNotFoundObject);
    }
    const creatorPermissions = permission.find((doc) => doc.role === creatorRole).permission;
    console.log(!creatorPermissions.includes("create_employee"));
    if (!creatorPermissions.includes("create_employee")) {
      const notAuthorizedErrorObject = {
        status: 404,
        message: "You do not have permission to create employee for this role",
      };
      return sendResponse(res, notAuthorizedErrorObject);
    }
    if (newEmployeeRole <= creatorRole) {
      const notAuthorizedErrorObject = {
        status: 404,
        message: "You do not have permission to create employee for this role",
      };
      return sendResponse(res, notAuthorizedErrorObject);
    }
    next();
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};

export default createControl;
