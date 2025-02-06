import express from "express";
import { noticeController } from "./notice.controller.js";

const router = express.Router();

router.post("/create", noticeController.createNotice); 
export const noticeRoute = router;
