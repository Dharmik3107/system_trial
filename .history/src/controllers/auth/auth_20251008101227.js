import User from "../../models/auth/auth";

export function login(req, res) {
  const { email, password } = req.body;
  const { user } = req.user;

  try {
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    sendResponse(res, serverErrorObject);
  }
}
