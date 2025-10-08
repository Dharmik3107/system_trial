import Distributor from "../../models/distributor/distributor";

export const createDistributor = async (req, res) => {
  const { distributorName, email } = req.body;
  const user = req.user;

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
