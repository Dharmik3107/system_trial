import express from "express";
import { login, createEmployee } from "../../controllers/auth/auth.js";

const router = express.Router();

// router.post("auth/login", authToken, login);
router.post("/login", login);
router.post("/create-employee", authToken, createEmployee);

export default router;
