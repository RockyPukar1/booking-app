import { body } from "express-validator";
import express from "express";

import { upload } from "../middlewares/file-upload.middleware";
import { verifyToken } from "../middlewares/verify-token.middleware";

import { addHotel, getAllHotels } from "../controllers/hotel.controllers";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .withMessage("Price per night is required")
      .isNumeric()
      .withMessage("Price per night must be a number")
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  addHotel
);

router.post(
  "/",
  verifyToken,
  getAllHotels
);

export default router;
