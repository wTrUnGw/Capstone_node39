import express from "express";
import {
  getUser,
  getUserById,
  getUserSavedPicture,
  getPictureCreatedByUser,
  addPicture,
} from "../controllers/userController.js";
import upload from "../config/upload.js";

const userRoute = express.Router();

// Nơi quản lý API của đối tượng User
userRoute.get("/get-user", getUser);
userRoute.get("/get-info", getUserById);
userRoute.get("/get-savedpicture", getUserSavedPicture);
userRoute.get("/get-createdpicture", getPictureCreatedByUser);
userRoute.post("/create", upload.single("picture"), addPicture);

export default userRoute;
