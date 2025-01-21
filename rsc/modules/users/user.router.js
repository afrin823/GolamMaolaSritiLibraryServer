import express from "express";
import { userController } from "./user.controller.js";

const router = express.Router();

router.post("/create", userController.createUser);

export const userRoute = router;
