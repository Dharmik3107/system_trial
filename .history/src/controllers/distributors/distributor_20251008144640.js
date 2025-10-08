import Distributor from "../../models/distributor/distributor.js";
import { sendResponse } from "../../services/sendResponse.js";

export const createDistributor = async (req, res) => {
  const { distributorName, email } = req.body;
  const user = req.user;

  try {
    const distributorData = new Distributor({
      distributorName,
      email,
      createdBy: user.email,
    });
    const distributor = await distributorData.save();
    const createdDistributorObject = {
      status: 200,
      message: "Distributor Created Successfully",
      data: distributor,
    };
    return sendResponse(res, createdDistributorObject);
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
