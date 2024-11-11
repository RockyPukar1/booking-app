import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

mongoose.connect(process.env.MONGODB_URI as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnning at PORT ${PORT}`);
});
