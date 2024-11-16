import express, { Request, Response } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.controllers";

import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.post("/login", [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  login,
]);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;
