import express from "express";
import authToken from "../../middlewares/auth/authToken.js";
// import createDistributorControl from "../../middlewares/auth/distributor/createDistributorControl.js";
// import { createDistributor } from "../../controllers/distributors/distributor.js";
import { createOrder } from "../../controllers/order/order.js";

const router = express.Router();

// router.post("auth/login", authToken, login);
// router.post("/create-distributor", login);
router.post("/create-order", authToken, createOrder);

export default router;
