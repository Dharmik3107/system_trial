import express from "express";
import * as dotenv from "dotenv";
import { sendResponse } from "./src/services/sendResponse.js";

dotenv.config();

const app = express();

app.use("/", (req, res) => {
  const serverCheckObject = {
    status: 200,
    message: "Server is running and your function is good",
  };
  sendResponse(res, serverCheckObject);
});

app.listen(process.env.PORT || "3000", (error) => {
  if (error) console.log(error.message);
  console.log(`Your server is running on http://localhost:${process.env.PORT || "3000"}`);
});
