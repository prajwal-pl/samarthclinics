import express from "express";
import cors from "cors";
import { connectMongoDb } from "./lib/mongodb.js";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import roleRoute from "./routes/role.route.js";
import prescriptionRoute from "./routes/prescription.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);
app.use("/api/prescription", prescriptionRoute);

app.listen(3000, () => {
  connectMongoDb();
  console.log("Server is running on port 3000");
});
