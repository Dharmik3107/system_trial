import express from "express";

const router = express.Router();

router.post("auth/login", authToken, login);
