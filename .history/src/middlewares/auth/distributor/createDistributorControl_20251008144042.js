// middleware/authToken.js
import { sendResponse } from "../../services/sendResponse.js";
import { permission } from "../../utils/permissions.js";

const createDistributorControl = async (req, res, next) => {
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
    if (!creatorPermissions.includes("create_distributor")) {
      const notAuthorizedErrorObject = {
        status: 404,
        message: "You do not have permission to create distributor for this role",
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

export default createDistributorControl;
