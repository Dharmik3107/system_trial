import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT || "3000", (error) => {
  if (error) console.log(error.message);
  console.log(`Your server is running on http://localhost:${process.env.PORT || "3000"}`);
});
