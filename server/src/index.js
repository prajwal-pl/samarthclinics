import express from "express";
import cors from "cors";
import { connectMongoDb } from "./lib/mongodb.js";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  connectMongoDb();
  console.log("Server is running on port 3000");
});
