import cloudinary from "cloudinary";
import { Request, Response } from "express";

import { HotelType } from "../shared/types";

import Hotel from "../models/hotel.model";

export const addHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImagesCloudinary(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;
    newHotel.lastUpdated = new Date();

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

async function uploadImagesCloudinary(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export async function getAllHotels(req: Request, res: Response) {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hotels",
    });
  }
}

export async function getHotelById(req: Request, res: Response) {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
}

export async function updateHotelById(req: Request, res: Response) {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel Not Found" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImagesCloudinary(imageFiles);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went throw" });
  }
}
