import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";

import "dotenv/config";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_URI as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnning at PORT ${PORT}`);
});
