import express from "express";
import { noticeController } from "./notice.controller.js";

const router = express.Router();

router.post("/create", noticeController.createNotice); 
router.get("/", noticeController.searchNotice); 
router.get("/:id", noticeController.singleNotice); 
router.delete("/:id", noticeController.deleteNotice); 
export const noticeRoute = router;
