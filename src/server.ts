import { Request, Response } from "express";
import cors from "cors";

var express = require("express");
const app = express();
const authRoutes = require("./routes/userAuthentication");

const corsOptions = {
  origin: "",
  methods: "GET, POST, PATCH, PUT, HEAD, DELETE",
  credential: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); //? preflight OPTIONS request allow, "*" => respond to OPTIONS requests on any route.

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Server");
});

app.use("/api", authRoutes);

app.listen(process.env.SERVER_PORT, () => console.log("Server is listening"));
