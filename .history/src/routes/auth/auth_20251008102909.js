import express from "express";
import { login } from "../../controllers/auth/auth.js";

const router = express.Router();

// router.post("auth/login", authToken, login);
router.post("/login", login);

export default router;
