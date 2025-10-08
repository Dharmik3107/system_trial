import Order from "../../models/order/order.js";
import Distributor from "../../models/distributor/distributor.js";
import Product from "../../models/product/product.js";
import { v6 as uuidv6 } from "uuid";
import { sendResponse } from "../../services/sendResponse.js";

export const createOrder = async (req, res) => {
  const { email, products } = req.body;
  try {
    let distributor = await Distributor.findOne({ email });
    const distributorCode = distributor._id;

    const ids = products.map((product) => product.productCode);
    const productsDocuments = await Product.find({ sku: { $in: ids } });
    const mappedProducts = products.map((product) => {
      const matched = productsDocuments.find((document) => product.productCode === document.sku);
      const productData = {
        productCode: matched._id,
        quantity: product.quantity,
      };
      return productData;
    });

    const orderDetails = new Order({
      orderCode: uuidv6(),
      distributorCode,
      products: mappedProducts,
    });
    distributor = {
      ...distributor,
      productSupplied: [
        ...productSupplied,
        {
          orderCode: orderDetails._id,
        },
      ],
    };

    await distributor.save();

    const order = await orderDetails.save();
    const orderCreatedSuccessfullObject = {
      status: 200,
      message: "Order Created Successfully",
      data: order,
    };
    sendResponse(res, orderCreatedSuccessfullObject);
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
