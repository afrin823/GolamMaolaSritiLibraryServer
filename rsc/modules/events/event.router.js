import express from "express";
import { eventController } from "./event.controller.js";

const router = express.Router();

router.post("/create", eventController.createEvent);
router.get("/", eventController.searchEvent);
router.get("/:id", eventController.singleEvent);
router.delete("/:id", eventController.deleteEvent);

export const eventRoute = router;
