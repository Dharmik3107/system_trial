import User from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";

export async function login(req, res) {
  const { email, password } = req.body;
  const { user } = req.user;
  console.log(user);
  try {
    const user_db = await User.findOne({ email });
    if (!user_db) {
      const userNotFoundObject = {
        status: 401,
        message: "User has not registered",
      };
      sendResponse(res, userNotFoundObject);
    }
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    sendResponse(res, serverErrorObject);
  }
}
