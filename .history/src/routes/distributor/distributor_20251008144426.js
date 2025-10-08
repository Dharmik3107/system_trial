import express from "express";
import authToken from "../../middlewares/auth/authToken.js";
import createDistributorControl from "../../middlewares/auth/distributor/createDistributorControl.js";

const router = express.Router();

// router.post("auth/login", authToken, login);
// router.post("/create-distributor", login);
router.post("/create-distributor", authToken, createDistributorControl, createEmployee);

export default router;
