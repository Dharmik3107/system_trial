import { SuperAdmin } from "../../config/db.js";
import Employee from "../../models/auth/auth.js";
import { sendResponse } from "../../services/sendResponse.js";
import generateToken from "../../utils/tokenGenerator.js";
import bcrypt from "bcryptjs";

export const SuperAdminCollection = SuperAdmin();

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    let employee = null;
    if ((await Employee.countDocuments()) === 0) {
      employee = await SuperAdminCollection.findOne({ email });
      console.log(employee);
    } else {
      employee = await Employee.findOne({ email });
    }

    if (!employee) {
      const employeeNotFoundObject = {
        status: 401,
        message: "Employee has not registered",
      };
      return sendResponse(res, employeeNotFoundObject);
    }

    if (!bcrypt.compare(password, employee.password)) {
      const notAuthorizedPasswordErrorObject = {
        status: 404,
        message: "Password is incorrect",
      };
      return sendResponse(res, notAuthorizedPasswordErrorObject);
    }

    const authToken = generateToken(employee.email);
    const loginSuccessfull = {
      status: 200,
      message: "User login successfull",
      data: { employee, authToken },
    };
    return sendResponse(res, loginSuccessfull);
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
}

export const createEmployee = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = req.user;
  console.log(user.email);
  if (role > 3) {
    const invalidEmployeeRoleObject = {
      status: 400,
      message: "Invalid Employee Role",
    };
    return sendResponse(res, invalidEmployeeRoleObject);
  }
  try {
    const newEmployeeObject = new Employee({
      firstName,
      lastName,
      email,
      password,
      role,
      createdBy: user.email,
    });
    const employee = await newEmployeeObject.save();
    if (employee) {
      const employeeDataObject = {
        status: 200,
        message: "Employee Created Successfully",
        data: employee,
      };
      return sendResponse(res, employeeDataObject);
    } else {
    }
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
