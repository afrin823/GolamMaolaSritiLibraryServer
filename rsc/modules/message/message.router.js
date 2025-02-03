import express from "express";
import { messageController } from "./message.controller.js";

const router = express.Router();

router.post("/create", messageController.createMessage);
router.get("/", messageController.getAllMessage);
router.patch("/:id", messageController.updateSingleMessage);
router.delete("/:id", messageController.deleteSingleMessage);

export const messageRoute = router;
