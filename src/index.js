import express from "express";
import cors from "cors";

const app = express();

// khai báo port
app.listen(8080);

app.use(cors());
app.use(express.json());
app.use(express.static("."));
// test
app.get("/demo", (request, response) => {
    response.send("Hí anh em");
  });

  // kết nối csdl
import mysql from "mysql2";

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3307",
  database: "CapstoneExpress",
});

// import rootRoute from "./routes/rootRoutes";
import rootRoute from "./routes/rootRoutes.js";
app.use(rootRoute);