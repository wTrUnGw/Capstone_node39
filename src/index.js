import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

const app = express();

// khai báo port
app.listen(8080);
app.use(cors());
app.use(express.json());
app.use(express.static("."));

//test
app.use(rootRoute);