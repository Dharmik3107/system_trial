import express from "express";
import { login } from "../../controllers/auth/auth";

const router = express.Router();

// router.post("auth/login", authToken, login);
router.post("auth/login", login);

export default router;
