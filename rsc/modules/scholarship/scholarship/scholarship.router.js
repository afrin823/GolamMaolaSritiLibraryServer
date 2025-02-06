import express from "express";
import { scholarshipController } from "./scholarship.controller.js";

const router = express.Router();

router.post("/create", scholarshipController.createScholarship);
export const scholarshipRoute = router;
