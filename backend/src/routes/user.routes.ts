import express from "express";
import { check } from "express-validator";

import { register, getMe } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.get("/me", verifyToken, getMe);

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  register
);

export default router;
