import Order from "../../models/order/order.js";
import Distributor from "../../models/distributor/distributor.js";
import { v6 as uuidv6 } from "uuid";

export const createOrder = async (req, res) => {
  const { email, products } = req.body;
  try {
    const distributor = await Distributor.findOne({ email });
    const distributorCode = distributor._id;
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
