import Product from "../../models/product/product";
import { v6 as uuidv6 } from "uuid";
import { sendResponse } from "../../services/sendResponse";

export const createProduct = async (req, res) => {
  const { productName, description } = req.body;
  try {
    const newProduct = new Product({
      productName,
      sku: uuidv6(),
      description,
    });
    const product = await newProduct.save();
    const productCreatedSuccessfullObject = {
      status: 200,
      message: "Product created Successfully",
      data: product,
    };
    return sendResponse(res, productCreatedSuccessfullObject);
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
