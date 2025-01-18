import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { notFoundRoute } from "./rsc/error/notFoundRoute.js";
import { main } from "./rsc/server/server.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://golam-maola-sriti-library.vercel.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

main(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.all('*', notFoundRoute);