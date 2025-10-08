import express from "express";
import * as dotenv from "dotenv";
import { sendResponse } from "./src/services/sendResponse.js";
import authRouter from "./src/routes/auth/auth.js";
import distributorRouter from "./src/routes/distributor/distributor.js";
import cors from "cors";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/distributor", distributorRouter);

const serverSetup = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || "3000", (error) => {
      if (error) console.log(error.message);
      console.log(`Your server is running on http://localhost:${process.env.PORT || "3000"}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

serverSetup();
