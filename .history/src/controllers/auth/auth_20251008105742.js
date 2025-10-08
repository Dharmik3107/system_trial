import Employee from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = req.user;
  console.log(user);
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      const employeeNotFoundObject = {
        status: 401,
        message: "Employee has not registered",
      };
      sendResponse(res, employeeNotFoundObject);
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

export const createEmployee = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const newEmployeeObject = new Employee({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    const employee = await newEmployeeObject.save();
    if (employee) {
      const employeeDataObject = {
        status: 200,
        message: "Employee Created Successfully",
        data: employee,
      };
    } else {
    }
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    sendResponse(res, serverErrorObject);
  }
};
