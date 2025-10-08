import express from "express";
import * as dotenv from "dotenv";
import { sendResponse } from "./src/services/sendResponse.js";
import authRouter from "./src/routes/auth/auth.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use("/", (req, res) => {
  const serverCheckObject = {
    status: 200,
    message: "Server is running and your function is good",
  };
  sendResponse(res, serverCheckObject);
});

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || "3000", (error) => {
  if (error) console.log(error.message);
  console.log(`Your server is running on http://localhost:${process.env.PORT || "3000"}`);
});
