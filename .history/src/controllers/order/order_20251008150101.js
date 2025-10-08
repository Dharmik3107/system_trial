import Order from "../../models/order/order.js";
import Distributor from "../../models/distributor/distributor.js";
import { v6 as uuidv6 } from "uuid";

export const createOrder = async (req, res) => {
  const { orderId, email } = req.body;
};
