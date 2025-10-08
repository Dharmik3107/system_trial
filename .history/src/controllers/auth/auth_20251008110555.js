import Employee from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";
import generateToken from "../../utils/tokenGenerator.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      const employeeNotFoundObject = {
        status: 401,
        message: "Employee has not registered",
      };
      sendResponse(res, employeeNotFoundObject);
    }
    const authToken = generateToken(employee.email);
    const loginSuccessfull = {
      status: 200,
      message: "User login successfull",
      data: { employee, authToken },
    };
    sendResponse(res, loginSuccessfull);
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
  const user = req.user;
  console.log(user.email);
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
      sendResponse(res, employeeDataObject);
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
