import express from "express";
import { login, createEmployee } from "../../controllers/auth/auth.js";
import authToken from "../../middlewares/auth/authToken.js";
import createEmployeeControl from "../../middlewares/auth/createEmployeeControl.js";

const router = express.Router();

// router.post("auth/login", authToken, login);
router.post("/login", login);
router.post("/create-employee", authToken, createEmployeeControl, createEmployee);

export default router;
