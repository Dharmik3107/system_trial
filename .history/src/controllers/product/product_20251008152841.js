import Product from "../../models/product/product";

const createProduct = async (req, res) => {
  const {} = req.body;
  try {
  } catch (error) {
    console.log(error.message);
    const serverErrorObject = {
      status: 500,
      message: "Internal Server Error" + error.message,
    };
    return sendResponse(res, serverErrorObject);
  }
};
