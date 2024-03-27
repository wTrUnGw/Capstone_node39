import express from "express";
import userRoute from "./userRoutes.js";
import authRoute from "./authRoutes.js";
import pictureRoute from "./pictureRoutes.js";

// NƠI QUẢN LÝ API TỔNG LIÊN KẾT VỚI CÁC API KHÁC
const rootRoute = express.Router();

// user
rootRoute.use("/user", userRoute);

// auth
rootRoute.use("/auth", authRoute);

// picture
rootRoute.use("/picture", pictureRoute);

export default rootRoute;