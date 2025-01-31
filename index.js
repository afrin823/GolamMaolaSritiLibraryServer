import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { globalError } from "./rsc/error/globalError.js";
import { notFoundRoute } from "./rsc/error/notFoundRoute.js";
import { bookRoute } from "./rsc/modules/book/book.router.js";
import { eventRoute } from "./rsc/modules/events/event.router.js";
import { userRoute } from "./rsc/modules/users/user.router.js";
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

app.use("/api/v1/user", userRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/event", eventRoute);

app.all("*", notFoundRoute);
app.use(globalError);
